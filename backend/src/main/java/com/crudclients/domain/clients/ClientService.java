package com.crudclients.domain.clients;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public ResponseEntity getHistories() throws Exception {
        List<Client> clients = clientRepository.findAll();

        return ResponseEntity.ok().body(clients);
    }

    public ResponseEntity createANewClient(Client newClient) throws Exception {
        Client clientModel = createClientModel(newClient);

        return ResponseEntity.ok(saveClient(clientModel));
    }

    public ResponseEntity updateClient(String idClient,
                                       Client updatedClientData) {
        Client oldClientData = clientRepository.findById(idClient).get();
        Client updatedDataClient = updateDataClientModel(oldClientData, updatedClientData);

        return ResponseEntity.ok(saveClient(updatedDataClient));
    }

    public ResponseEntity deleteClient(String idClient) throws Exception {
        clientRepository.deleteById(idClient);

        return ResponseEntity.ok().body("client successfully deleted");
    }

    public Client saveClient(Client newClient) {
        return clientRepository.save(newClient);
    }

    public Client createClientModel(Client clientData) {
        return new Client.Builder()
                .setClientName(clientData.getClientName())
                .setClientEmail(clientData.getClientEmail())
                .setClientPhoneNumber(clientData.getClientPhoneNumber())
                .setClientAddress(clientData.getClientAddress())
                .build();
    }

    public Client updateDataClientModel(Client oldClientData, Client newClientData) {
        return new Client.Builder()
                .setId(oldClientData.getId())
                .setClientName(newClientData.getClientName())
                .setClientEmail(newClientData.getClientEmail())
                .setClientPhoneNumber(newClientData.getClientPhoneNumber())
                .setClientAddress(newClientData.getClientAddress())
                .build();
    }
}
