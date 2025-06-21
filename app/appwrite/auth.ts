import {account, appwriteConfig, database} from "~/appwrite/client";
import {OAuthProvider, Query, ID, type QueryTypesList} from "appwrite";
import {redirect} from "react-router";
import axios from "axios";

export const loginWithGoogle = async () => {
    try {
        return await account.createOAuth2Session(OAuthProvider.Google);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUser = async () => {
    try {
        const user = await account.get();
        if (!user) return redirect('/sign-in');
        const {documents} = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId']),
            ]
        );

        return documents.length > 0 ? documents[0] : null;
    } catch (e) {
        console.log(e);
        return null;
    }
}
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


export const getGooglePicture = async () => {
    try {
        // Get the current user session
        const session = await account.getSession('current');

        // Check if the session has a provider token (Google OAuth token)
        if (session && session.provider === 'google') {
            // Get the OAuth2 token
            const token = session.providerAccessToken;


            // Make a request to the Google People API
            const response = await axios.get(
                'https://people.googleapis.com/v1/people/me?personFields=photos',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Extract the profile photo URL from the response
            if (response.data &&
                response.data.photos &&
                response.data.photos.length > 0) {
                return response.data.photos[0].url;
            }
        }

        // Return null if no photo is found
        return null;
    } catch (e) {
        console.log('Error fetching Google profile picture:', e);
        return null;
    }
}

export const storeUserData = async (userData: { imageUrl: any; name: any; email: any; }) => {
    try {
        const user = await account.get();

        // Check if user already exists
        const existingUser = await getExistingUser(user.$id);
        if (existingUser) {
            return existingUser;
        }

        // Get profile picture from Google if available
        let imageUrl = userData.imageUrl;
        if (!imageUrl) {
            imageUrl = await getGooglePicture();
        }

        // Create new user document
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                name: userData.name || user.name,
                email: userData.email || user.email,
                imageUrl: imageUrl || '',
                joinedAt: new Date().toISOString(),
            }
        );

        return newUser;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getExistingUser = async (accountId: string | number | boolean | QueryTypesList) => {
    try{
        const {documents} = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', accountId),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId']),
            ]
        );

        return documents.length > 0 ? documents[0] : null;
    } catch (e){
        console.log(e);
        return null;
    }
}
