## Management of PackageItems without Assigned CourierId

When creating a PackageItem, the courierId field is optional to reflect situations where a courier has not been assigned at the time of package creation. To ensure that these packages do not remain unassigned for long periods, it is crucial for administrators to actively manage courier assignments.
Notification Functionality for Pending PackageItems

We have implemented a use case that allows administrators to retrieve a list of all PackageItems that do not yet have a courierId assigned. This use case can be executed as needed throughout the day, enabling administrators to check and update the status of outstanding packages at regular intervals.

### Best Practices:

    Regular Checks: Administrators should regularly use this use case to ensure that all packages are timely assigned to a courier. We recommend conducting these checks multiple times a day, depending on the volume of packages and the frequency of updates needed.
    Administrative Responsibility: We encourage administrators to integrate the execution of this use case into their daily routines to prevent the accumulation of packages without courier designation.

This approach does not rely on automated scripts or complex scheduling functionalities that would require the application to be continuously operational, simplifying maintenance and system operation.

### Future Enhancements:

    Should the application scale and operational complexities increase, there is potential to implement periodic automated notifications. Such enhancements would involve setting up scheduled tasks to automatically alert administrators of PackageItems that have been unassigned for an extended period. We have chosen not to implement this functionality at this stage to maintain system simplicity and avoid the overhead associated with continuous operation requirements. However, this feature could be revisited and implemented as part of future upgrades to meet growing administrative needs.

## Password Reset Flow

This project implements a secure password reset flow that is divided into two main parts: the domain layer handling the initial request and token generation, and the infrastructure layer handling the token validation and password update. Here's how the process is designed:

### Domain Layer

1. **Request Password Change Use Case (`RequestPasswordChangeUseCase`)**:
   - This use case is triggered when a user initiates a password reset request. It verifies the user's identity based on the provided email and, if valid, generates a unique access token.
   - This token, along with the user's email, is then encapsulated in a `RequestPasswordChangeEvent`, which is dispatched to signal that the user has requested a password change.

2. **Send Password Reset Email (Subscriber: `OnRequestPasswordChange`)**:
   - Upon catching the `RequestPasswordChangeEvent`, this subscriber constructs and sends an email to the user. The email contains a link with the unique access token embedded as a query parameter.
   - The link points to a predefined URL (currently set to `http://localhost:3000/reset-password` for testing purposes) where the user can complete the password reset process.

### Infrastructure Layer (Planned Implementation)

1. **Password Reset Endpoint**:
   - A dedicated endpoint will be implemented to handle incoming password reset requests. This endpoint will extract the access token from the query parameters and validate it.
   - If the token is valid, the server will prompt the user to enter a new password. This could be handled via a simple API where the new password is submitted along with the validated token.

2. **Reset Password Use Case (`ResetPasswordUseCase`)**:
   - Once the new password and token are submitted, this use case will be responsible for validating the token again, ensuring it hasn't expired and matches the user's session.
   - If all validations pass, the user's password will be updated in the database, and the token will be invalidated to prevent reuse.

