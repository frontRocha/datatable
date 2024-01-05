package com.crudclients.web.clients;

import com.crudclients.domain.clients.Client;
import com.crudclients.domain.clients.ClientService;
import com.crudclients.infra.errorResponse.ErrorResponse;
import com.crudclients.infra.errorResponse.ErrorResponseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/clients")
public class ClientsController {

    public final ClientService clientService;
    private final ErrorResponseService errorResponseService;

    public ClientsController(ClientService clientService,
                             ErrorResponseService errorResponseService) {
        this.clientService = clientService;
        this.errorResponseService = errorResponseService;
    }

    @GetMapping("")
    public ResponseEntity getClients() {
        try {
            ResponseEntity response = clientService.getHistories();

            return response;
        } catch(Exception err) {
            return errorResponse(err.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity createANewClient(@RequestBody Client newClient) {
        try {
            ResponseEntity response = clientService.createANewClient(newClient);

            return response;
        } catch(Exception err) {
            return errorResponse(err.getMessage());
        }
    }

    @PutMapping("/{idClient}")
    public ResponseEntity updateClient(@PathVariable String idClient,
                                       @RequestBody Client updatedClientData) {
        try {
            ResponseEntity response = clientService.updateClient(idClient, updatedClientData);

            return response;
        } catch(Exception err) {
            return errorResponse(err.getMessage());
        }
    }

    @DeleteMapping("/{idClient}")
    public ResponseEntity deleteClient(@PathVariable String idClient) {
        try {
            ResponseEntity response = clientService.deleteClient(idClient);

            return response;
        } catch(Exception err) {
            return errorResponse(err.getMessage());
        }
    }

    private ResponseEntity<ErrorResponse> errorResponse(String message) {
        ErrorResponse errorResponse = errorResponseService.errorBadRequest(message);

        return ResponseEntity.badRequest().body(errorResponse);
    }
}
