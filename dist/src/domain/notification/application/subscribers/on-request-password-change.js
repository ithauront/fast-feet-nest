"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnRequestPasswordChange = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const request_password_change_1 = require("../../../delivery/enterprise/events/request-password-change");
class OnRequestPasswordChange {
    constructor(sendEmail) {
        this.sendEmail = sendEmail;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendRequestPasswordChangeEmail.bind(this), request_password_change_1.RequestPasswordChangeEvent.name);
    }
    async sendRequestPasswordChangeEmail({ accessToken, userEmail, }) {
        const resetPasswordUrl = `http://localhost:3000/reset-password?token=${accessToken}`;
        await this.sendEmail.execute({
            recipientEmail: userEmail,
            subject: 'You requested a password change',
            body: `Please click on the link and follow the instructions to reset your password:${resetPasswordUrl}`,
        });
    }
}
exports.OnRequestPasswordChange = OnRequestPasswordChange;
//# sourceMappingURL=on-request-password-change.js.map