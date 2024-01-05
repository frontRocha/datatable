package com.crudclients.domain.clients;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String clientName;
    private String clientEmail;
    private String clientPhoneNumber;
    private String clientAddress;

    @Getter
    public static class Builder {
        private String id;
        private String clientName;
        private String clientEmail;
        private String clientPhoneNumber;
        private String clientAddress;

        public Builder() {
            this.id = null;
            this.clientName = null;
            this.clientEmail = null;
            this.clientPhoneNumber = null;
            this.clientAddress = null;
        }

        public Builder setId(String id) {
            this.id = id;
            return this;
        }

        public Builder setClientName(String clientName) {
            this.clientName = clientName;
            return this;
        }

        public Builder setClientEmail(String clientEmail) {
            this.clientEmail = clientEmail;
            return this;
        }

        public Builder setClientPhoneNumber(String clientPhoneNumber) {
            this.clientPhoneNumber = clientPhoneNumber;
            return this;
        }

        public Builder setClientAddress(String clientAddress) {
            this.clientAddress = clientAddress;
            return this;
        }

        public Client build() {
            return new Client(id, clientName, clientEmail, clientPhoneNumber, clientAddress);
        }
    }
}
