package Backend.StockMatchBackend.services.impl;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.repository.PreferencesRepository;
import Backend.StockMatchBackend.repository.UserRepository;
import Backend.StockMatchBackend.services.UserService;
import Backend.StockMatchBackend.services.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockTableServiceImpl stockTableService;

    @Autowired
    private PreferencesRepository preferencesRepository;

    public User processUserLogin(UserDTO userDTO) {
        Optional<User> userOptional = userRepository.findBySubID(userDTO.getSub());

        User user = userOptional.orElseGet(() -> createUserFromDTO(userDTO));

        if (userOptional.isPresent()) {
            updateUserFromDTO(user, userDTO);
        }

        return userRepository.save(user);
    }

    private User createUserFromDTO(UserDTO userDTO) {
        User user = new User();
        user.setSubID(userDTO.getSub());
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getName());
        return user;
    }

    private void updateUserFromDTO(User user, UserDTO userDTO) {
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getName());
    }

    public Preferences getUserPreferences(String subId) {
        User user = userRepository.findBySubID(subId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        return preferencesRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Preferences not found"));
    }
}
