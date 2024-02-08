import { ADMIN_ROLE, CEO_ROLE, HOS_ROLE, SALES_PERSON_ROLE, SUPPORT_ROLE } from "@/constants/common";
import { ACTION_TYPE, REQUEST_STATUSES, inititalActions } from "../requestActions";

export const getActionsAfterInitiated = (currentRole: string) => {
    let actions = [...inititalActions];
    switch (currentRole) {//role

        case ADMIN_ROLE:
            actions.map((action: ACTION_TYPE) => {
                switch (action.name) {
                    case "Initiate":
                        action.active = false;
                        break;
                    case "Approve":
                        action.active = true;
                        action.action = REQUEST_STATUSES.APPROVED_BY_ADMIN;
                        break;
                    case "Negotiate":
                        action.active = true;
                        action.action = REQUEST_STATUSES.NEGOTIATE_BY_ADMIN;
                        break;
                    case "Reject":
                        action.active = true;
                        action.action = REQUEST_STATUSES.REJECTED_BY_ADMIN;
                        break;
                }
            })
            break;

        case CEO_ROLE:
            actions.map((action: ACTION_TYPE) => {
                switch (action.name) {
                    case "Initiate":
                        action.active = false;
                        break;
                    case "Approve":
                        action.active = false;
                        break;
                    case "Negotiate":
                        action.active = true;
                        break;
                    case "Reject":
                        action.active = true;
                        break;
                }
            })
            break;

        case HOS_ROLE:
            actions.map((action: ACTION_TYPE) => {
                switch (action.name) {
                    case "Initiate":
                        action.active = false;
                        break;
                    case "Approve":
                        action.active = true;
                        action.action = REQUEST_STATUSES.APPROVED_BY_HOS
                        break;
                    case "Negotiate":
                        action.active = true;
                        action.action = REQUEST_STATUSES.NEGOTIATE_BY_HOS
                        break;
                    case "Reject":
                        action.active = true;
                        action.action = REQUEST_STATUSES.REJECTED_BY_HOS
                        break;
                }
            })
            break;

        case SALES_PERSON_ROLE:
            actions.map((action: ACTION_TYPE) => {
                switch (action.name) {
                    case "Initiate":
                        action.active = false;
                        break;
                    case "Approve":
                        action.active = false;
                        break;
                    case "Negotiate":
                        action.active = false;
                        break;
                    case "Reject":
                        action.active = false;
                        break;
                }
            })
            break;

        case SUPPORT_ROLE:
            actions.map((action: ACTION_TYPE) => {
                switch (action.name) {
                    case "Initiate":
                        action.active = false;
                        break;
                    case "Approve":
                        action.active = false;
                        break;
                    case "Negotiate":
                        action.active = false;
                        break;
                    case "Reject":
                        action.active = false;
                        break;
                }
            })
            break;
        default:
            break;
    }
    return actions
}