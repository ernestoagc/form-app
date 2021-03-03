import { environment } from 'src/environments/environment';

export class AppConstants {    
    
    public static get serviceFormPath(): string { return environment.servicioURL+"/api/"; }
    public static get authenticationPath(): string { return environment.servicioURL; }
    
    
}