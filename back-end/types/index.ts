type ProfileInput = {
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    bio?: string;
};

type ResourceInput = {
    title?: string;
    description?: string;
    filePath?: string;
    thumbNail: string;
    profileId?: number;
};

type CommentInput = {
    resourceId?: number;
    profileId?: number;
    message?: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    id: string;
    role: Role;
};

type Role = 'ADMIN' | 'USER';

enum Category {
    Summary = 'Summary',
    CheatSheet = 'Cheat Sheet',
    LectureNotes = 'Lecture Notes',
}

enum Subject {
    //sommige vakken zitten in 2 of meerdere keuzetrajecten, ik heb ze chronologisch ingevuld
    // vb. Digital Experience (DE) heeft User Interfaces -> zet het bij DE, SW DEV heeft dit ook, spijtig maar staat al bij DE

    /*####################################################################
                                  F A S E   1
    ####################################################################*/

    //SW DEV
    FrontEnd_Development = 'Front-End Development',
    Programming1 = 'Programming 1',
    BackEnd_Development = 'Back-End Development',
    Programming2 = 'Programming 2',

    //Infrastructure
    Computer_Systems = 'Computer Systems',
    Computer_Networks = 'Computer Networks',

    //AI
    Database_Foundations = 'Database Foundations',

    //Business
    IT_Business = 'IT & Business',

    //Prof. skills
    Introductieproject = 'Introductieproject',
    IT_Industry_Discovery = 'IT Industry Discovery',

    /*####################################################################
                                  F A S E   2
    ####################################################################*/

    //SW DEV
    FullStack_Software_Develoment = 'Full-Stack Software Development',
    Software_Engineering = 'Software Engineering',

    //Infrastructure
    Server_System_Management = 'Server & System Management',

    //AI
    Data_Analytics_Machine_Learning = 'Data Analytics & Machine Learning',
    Data_Management = 'Data Management',

    //Business
    IT_Society = 'IT & Society',

    //Prof. skills
    Junior_Werkplekproject = 'Junior Werkplekproject',
    IT_Integratieproject = 'IT Integratieproject',

    //vakken AI
    Advanced_AI = 'Advanced AI',
    Data_Engineering = 'Data Engineering',
    Data_Visualisation = 'Data Visualisation',

    //vakken Business
    Business_Solutions_Platforms = 'Business Solutions Platforms',
    Innovation_Management = 'Innovation Management',

    //vakken Digital Experience
    User_Interfaces = 'User Interfaces',
    New_Medialab_Gamification = 'New Medialab Gamification',
    _3D_Graphics = '3D Graphics',

    // Vakken Infrastructure
    Cloud_Fundamentals = 'Cloud Fundamentals',
    Wireless_Communications = 'Wireless Communications',
    Advanced_Networking_Security_1 = 'Advanced Networking & Security 1',

    //Vakken SW DEV
    Advanced_Programming = 'Advanced Programming',

    /*####################################################################
                                  F A S E   3
    ####################################################################*/

    IT_Innovation = 'IT Innovation',
    Senior_Werkplekproject = 'Senior Werkplekproject',
    Bachelor_Project = 'Bachelor Project',
    Bedrijfsstage = 'Bedrijfsstage',
    Onderzoeksstage = 'Onderzoeksstage',

    //AI
    European_University_I_Living_Labs_1 = 'European University: I living Labs 1',
    European_University_Explore_Learning_Snacks_1 = 'European University: Explore Learning Snacks 1',
    AI_Applications = 'AI Applications',
    Data_Incubator = 'Data Incubator',

    //Business
    Business_Solutions_Platforms_Project = 'Business Solutions Platforms Project',
    IT_Consultancy = 'IT Consultancy',

    //Digital Experience
    Mobile_Applications = 'Mobile Applications',
    Extended_Reality = 'Extended Reality',
    New_Medialab_UX_UI_Design = 'New Medialab-UX & UI Design',
    Internationaal_Innovations_Labs_IT = 'Internationaal Innovations Labs IT',

    Bachelor_At_Work_Noord_Zuid = 'Bachelor@work Noord-Zuid',
    Bachelor_At_Work_Small_Business_Project = 'Bachelor@work Small Business Project',

    //Infrastructure
    Enterprise_Server_Management = 'Enterprise Server Management',
    Cloud_Operations = 'Cloud & Operations',
    Application_Security = 'Application Security',
    Advanced_Networking_Security_2 = 'Advanced Networking & Security 2',

    //SW DEV
    Distributed_Applications = 'Distributed Applications',
    Cloud_Native_Engineering = 'Cloud Native Engineering',
}

export { AuthenticationResponse, Category, CommentInput, ProfileInput, ResourceInput, Role, Subject };
