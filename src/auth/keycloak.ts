import Keycloak from 'keycloak-js';
// Tạo một instance Keycloak
const keycloak = new Keycloak({
    url: "https://keycloakprod.phanmemvet.vn",
    realm: "browser-task", // Thay thế 'your-realm' bằng realm của bạn
    clientId: 'vetgo-fe',
});
// Khởi tạo Keycloak với các tùy chọn

export default keycloak;
