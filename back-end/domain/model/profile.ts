import { Profile as ProfilePrisma } from '@prisma/client';
import { Role } from '../../types';

export class Profile {
    readonly id?: number;
    readonly email: string;
    readonly password: string;
    readonly role?: Role;
    readonly username: string;
    readonly bio?: string;
    readonly createdAt?: Date;
    readonly latestActivity?: Date;

    constructor(profile: {
        id?: number;
        email: string;
        password: string;
        role?: Role;
        username: string;
        bio?: string;
        createdAt?: Date;
        latestActivity?: Date;
    }) {
        Profile.validateUsername(profile.username);
        Profile.validateEmail(profile.email);
        Profile.validatePassword(profile.password);
        Profile.validateRole(profile.role);
        Profile.validateBio(profile.bio);
        this.id = profile.id;
        this.email = profile.email;
        this.password = profile.password;
        this.role = profile.role;
        this.username = profile.username;
        this.bio = profile.bio;
        this.createdAt = profile.createdAt ? profile.createdAt : new Date();
        this.latestActivity = profile.latestActivity ? profile.latestActivity : this.createdAt;
    }

    equals(otherProfile: { email: string; password: string; role?: Role; username: string; bio?: string }): boolean {
        return (
            this.email === otherProfile.email &&
            this.password === otherProfile.password &&
            this.role === otherProfile.role &&
            this.username === otherProfile.username &&
            this.bio === otherProfile.bio
        );
    }

    static validateEmail = (email: string): void => {
        if (!email) throw new Error('Email is required');
        if (!email.includes('@')) throw new Error("Email must contain a '@'");
    };

    static validatePassword = (password: string): void => {
        if (!password?.trim()) throw new Error('Password is required');
        if (password.length < 8) throw new Error('Password must be at least 8 characters long');
        if (!password.match(/\d/)) throw new Error('Password must contain at least 1 number');
        if (!password.match(/[A-Z]/)) throw new Error('Password must contain at least 1 capital letter');
        if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
            throw new Error(`Password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`);
        }
    };

    static validateRole = (role: Role): void => {
        if (role == null) return;
        if (!['admin', 'user', 'guest'].includes(role))
            throw new Error('Role must be one of "admin", "user", or "guest"');
    };

    static validateUsername = (username: string): void => {
        if (!username) throw new Error('Username is required');
        if (username.length > 30) throw new Error('Username cannot be longer than 30 characters');
    };

    static validateBio = (bio: string): void => {
        if (bio != null && bio.length > 200) throw new Error('Bio cannot be longer than 200 characters');
    };

    static from({ id, email, password, role, username, bio, createdAt, latestActivity }: ProfilePrisma): Profile {
        return new Profile({
            id,
            email,
            password,
            role: role as Role,
            username,
            bio,
            createdAt: createdAt ? createdAt : new Date(),
            latestActivity,
        });
    }
}
