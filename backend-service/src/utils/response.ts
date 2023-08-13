export default class ApiResponse {
    success;
    message;
    data;

    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(message, data) {
        return new ApiResponse(true, message, data);
    }

    static error(message, data) {
        return new ApiResponse(false, message, data);
    }
}