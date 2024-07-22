# Fast-Feet

Welcome to the Fast-Feet application, a delivery management system designed for both delivery personnel and administrators. This application facilitates the management of deliveries, users, and recipients, providing extensive controls.

## Application Rules

   * The application supports two types of users: Courier and Admin.
   * Users can log in using their CPF and Password.
   * CRUD (Create, Read, Update, Delete) operations are possible for delivery personnel. (see Absence of Delete session).
   * CRUD operations are possible for Courier.
   * CRUD operations are possible for recipients.
   * Package Items can be marked as 'Awaiting Pickup'.
   * Package Items can be marked as 'In transit. (withdraw package item from wharehouse)
   * Package Items can be marked as 'Delivered'.
   * Package Items can be marked as 'Returned'.
   * Package Items can be listed with delivery addresses close to the Courier's location.
   * Users can change their passwords.
   * Package Items assigned to a user can be listed.
   * Recipients can be notified of any status change in the delivery.

## Business Rules

   * Only Admins can perform CRUD operations on package items, couriers, and recipients.
   * Marking a package item as 'Delivered' requires a photo as mandatory evidence.
   * Only the courier who picked up the delivery can mark it as 'Delivered'.
   * Only an Admin can change a user's password. (see Password Reset Flow)
   * A courier cannot list package items assigned to other couriers.

## Concepts to Practice

   * DDD (Domain-Driven Design), Domain Events, Clean Architecture: Enhance the project's structure and maintainability.
   * Authentication and Authorization (RBAC - Role-Based Access Control): Secure the application effectively.
   * Unit and End-to-End Testing: Ensure the reliability and functionality of the application through thorough testing.
   * Integration with External Services: Expand the application's capabilities by integrating with third-party services.

## Initial Admin

According to the business rules, only an Admin can create Couriers, and there are two types of users supported by the application: Courier and Admin. This means the application does not have a higher hierarchy than Admin. Consequently, only Admins can create other Admins, as it would not be logical for Admins to be created by any other role. This presents a potential deadlock regarding how to create the first Admin. The solution was to create an Admin via a script at the initialization of the application, who can then create the first operational Admin. The initial Admin should be deactivated afterwards for security reasons.

The process is outlined in the main file as follows:

```javascript
const alreadyHasAdmin = await adminFactory.checkForExistingAdmin();

if (!alreadyHasAdmin) {
  try {
    const initialAdminPassword = envService.get('INITIAL_ADMIN_PASSWORD');
    const hashedPassword = await hash(initialAdminPassword, 8);

    await adminFactory.makePrismaAdmin({
      name: 'Initial Admin',
      cpf: '00000000000', // 11 zeros
      password: hashedPassword,
    });
  } catch (error) {
    console.error('Failed to create initial admin:', error);
  }
} else {
  console.log('Admin already exists.');
}
```
This code checks if the database already has an Admin (to handle system reboots), and if not, it creates an initial Admin with CPF '00000000000' and a password that must be set in the environment file. The system initiates with this Admin, who should immediately be used to create the first real Admin. Then, the initial Admin should be marked as inactive immediately for safety reasons.

## Recipient Interaction

In Fast-Feet, recipients do not have user accounts and therefore cannot log in to the system. However, they play a crucial role in the delivery process and receive updates about their packages through the following means:

   * Email Notifications: Recipients are notified via email about any status changes in their deliveries. These notifications ensure that recipients are kept informed about the progress of their delivery and receive the package ID without needing to access the system directly.

   * Sending Attachments: Once a package is delivered, recipients may need to upload attachments related to the delivery. This is facilitated through a public route that allows editing the attachments of a given Package Item using the package ID provided to the recipient. Given that the application rules specifically mention only the attachments sent by couriers as proof of delivery, I chose to extend this functionality to allow recipients to add further attachments. To safeguard against potential misuse, I have ensured that the initial courier's attachment remains immutable, preventing any modification by the recipient.

This setup simplifies the interaction for recipients, focusing on ease of access to information rather than requiring direct engagement with the system.

## Tracking Information

Fast-Feet functions as a comprehensive tracking system, which underscores the importance of maintaining a detailed audit trail. To facilitate this, I have implemented two key features:

### Absence of Delete

Instead of incorporating a delete feature, which could potentially lead to the loss of important information, we have designed entity lifecycles that conclude with a reversible end status. This approach ensures that changes, such as rehiring a dismissed employee or correcting errors, are manageable and not final. Each entity type has its own specific end statuses:

   * Admin:
      -  Inactive: This status is a boolean value used to indicate situations where an admin cannot interact with the system, whether due to vacations, dismissal, leave, or other circumstances.
   * Courier:
      -  On Vacation
      -  Dismissed
      -  Inactive (for other reasons)
   * Package Item:
      -  Lost
      -  Returned
      -  Delivered

### Log

To ensure comprehensive tracking, log entries are stored in the database with the following details:

   * ID
   * Package Item ID
   * Previous State
   * New State
   * Changed By
   * Changed At

This log captures every modification, particularly noting who made the change and when. While currently focused on tracking status changes of package items, this feature could be expanded to include user activities, such as who created a courier or deactivated an admin.

## Notifications

Since recipients do not have login capabilities, I decided to remove the internal notifications feature that was present in the early stages of the project. Fast-Feet now sends notifications exclusively through email, rather than using an internal message feature. This approach ensures that everyone involved, including recipients without system access, receives notifications. By centralizing all notifications on a single platform, we eliminate the need for different types of notification systems for users and non-users alike. This simplifies the communication process and enhances the efficiency of our notification system.

## Management of PackageItems without Assigned CourierId

When creating a PackageItem, the courierId field is optional to reflect situations where a courier has not been assigned at the time of package creation. To ensure that these packages do not remain unassigned for long periods, it is crucial for administrators to actively manage courier assignments.
   * Notification Functionality for Pending PackageItems
     - I have implemented a use case that allows administrators to retrieve a list of all PackageItems that do not yet have a courierId assigned. This use case can be executed as needed throughout the day, enabling administrators to check and update the status of outstanding packages at regular intervals.

   * Best Practices:
   - Regular Checks: Administrators should regularly use this use case to ensure that all packages are timely assigned to a courier. I recommend conducting these checks multiple times a day, depending on the volume of packages and the frequency of updates needed.
   - Administrative Responsibility: I encourage administrators to integrate the execution of this use case into their daily routines to prevent the accumulation of packages without courier designation.

This approach does not rely on automated scripts or complex scheduling functionalities that would require the application to be continuously operational, simplifying maintenance and system operation.

### Future Enhancements

Should the application scale and operational complexities increase, there is potential to implement periodic automated notifications. Such enhancements would involve setting up scheduled tasks to automatically alert administrators of PackageItems that have been unassigned for an extended period. I chose not to implement this functionality at this stage to maintain system simplicity and avoid the overhead associated with continuous operation requirements. However, this feature could be revisited and implemented as part of future upgrades to meet growing administrative needs.

## Password Reset Flow

The project adheres to a business rule stating that only Admins can change passwords. However, I have enhanced this functionality to enable users to change their own passwords using a token received by email. This secure password reset flow is structured into two main parts: the domain layer, which handles the initial request and token generation, and the infrastructure layer, which manages token validation and password updating.

This modification significantly increases security by ensuring that only the user knows their password. Admins no longer have access to user passwords. Consequently, the original rule that only Admins can change passwords has been improved to allow each user to manage their own password changes. Here is how the process is outlined:

### Domain Layer

   1.**Request Password Change Use Case (RequestPasswordChangeUseCase)**:
      -This use case is triggered when a user initiates a password reset request. It verifies the user's identity based on the provided email and, if valid, generates a unique access token.
      - This token, along with the user's email, is then encapsulated in a RequestPasswordChangeEvent, which is dispatched to signal that the user has requested a password change.

   2.**Send Password Reset Email (Subscriber: OnRequestPasswordChange)**:
      -Upon catching the RequestPasswordChangeEvent, this subscriber constructs and sends an email to the user. The email contains a link with the unique access token embedded as a query parameter.
      - The link points to an imaginary URL (currently set to https://fast-feet/frontend/password_reset for testing purposes) where the user can complete the password reset process.

### Infrastructure Layer

   1.**Password Reset Endpoint**:
      - A dedicated endpoint handles incoming password reset requests. This endpoint extracts the access token from the headers and validates it. (The imaginary front end would need to retrieve the token from the parameters of the request password change part of this flow and pass it to this endpoint via headers.)
   2.**Reset Password Use Case (ResetPasswordUseCase)**:
      -Once the new password and token are submitted, this use case is responsible for validating the token, ensuring it hasn't expired, and matches the user's session.
      -If all validations pass, the user's password is updated in the database, and the token is invalidated to prevent reuse.

## Unnecessary Database Consultation

In certain scenarios, I opted against performing database consultations that could be considered standard, such as verifying the current status of a package item before updating it. Typically, such a check would confirm whether the status is indeed the valid previous state or differs from the new state being applied.

The decision to skip these consultations was based on the following considerations:

   * Infrequency of Errors: Errors arising from not checking the current state are rare within this system.
   * Minimal Impact: When such errors do occur, they generally do not cause significant problems beyond consuming additional resources.
   * Resource Management: The choice was between consuming resources to read from the database before every write operation or occasionally dealing with redundant write operations (e.g., changing the package item status from 'In Transit' to 'In Transit').

Although reading from the database typically consumes fewer resources than writing, I determined that errors would be infrequent enough to justify a more streamlined approach. Thus, allowing operations to proceed without prior consultation is preferred, rather than consistently verifying and potentially halting operations due to redundancy or minor mistakes.

## Further Documentation

Throughout the development of the application, I have placed comments at strategic points within various files. These comments are either at the beginning of a file or alongside specific sections that may require additional explanation. This practice was adopted to clarify certain parts of the code and to provide justifications for specific design and logic decisions made during the development process. These annotations aim to enhance the understandability of the codebase, making it more accessible for future developers and maintainers.

## **Author** :black_nib:

* **Iuri Reis** - [Iuri Reis](https://github.com/ithauront)


## License :page_with_curl:
This project is licensed under the [MIT License](https://opensource.org/license/mit/).