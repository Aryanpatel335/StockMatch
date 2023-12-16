package Backend.StockMatchBackend.services;

import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.services.dto.UserDTO;

public interface UserService {
    User processUserLogin(UserDTO userDTO);
}
