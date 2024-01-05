package com.crudclients.infra.errorResponse;

import org.springframework.stereotype.Service;

@Service
public class ErrorResponseService {
    public ErrorResponse errorAuthentication(String message) {
        return new ErrorResponse.Builder()
                .setMessageError(message)
                .setCodeError(401)
                .build();
    }

    public ErrorResponse errorBadRequest(String message) {
        return new ErrorResponse.Builder()
                .setMessageError(message)
                .setCodeError(400)
                .build();
    }
}
