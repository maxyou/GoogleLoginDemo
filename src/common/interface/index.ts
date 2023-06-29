export interface GoogleLoginButtonProps {
    gsi_src: string;
    client_id: string;  
    login_uri?: string;
    direct_uri?: string;
  }
  
export interface GoogleUser {
    id: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
    jwt: string;
}