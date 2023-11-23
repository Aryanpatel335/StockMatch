package Backend.StockMatchBackend.services.impl;

import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.repository.UserRepository;
import Backend.StockMatchBackend.services.UserService;
import Backend.StockMatchBackend.services.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public User processUserLogin(UserDTO userDTO) {
        User user = userRepository.findBySubID(userDTO.getSub());
        if (user == null) {
            user = createUserFromDTO(userDTO);
        } else {
            updateUserFromDTO(user, userDTO);
        }
        return userRepository.save(user);
    }

    private User createUserFromDTO(UserDTO userDTO) {
        User user = new User();
        // Set user properties from DTO
        user.setSubID(userDTO.getSub());
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getName());
        // Initialize or set preferences and watchlists if necessary
        return user;
    }

    private void updateUserFromDTO(User user, UserDTO userDTO) {
        // Update user properties from DTO
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getName());
        // Update preferences and watchlists if necessary
    }
}
