package com.crudclients.infra.errorResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ErrorResponse {
    private String messageError;
    private Integer codeError;

    @Getter
    public static class Builder {
        private String messageError;
        private Integer codeError;

        public Builder() {
            this.messageError = null;
            this.codeError = null;
        }

        public Builder setMessageError(String messageError) {
            this.messageError = messageError;
            return this;
        }

        public Builder setCodeError(Integer codeError) {
            this.codeError = codeError;
            return this;
        }

        public ErrorResponse build() {
            return new ErrorResponse(messageError, codeError);
        }
    }
}