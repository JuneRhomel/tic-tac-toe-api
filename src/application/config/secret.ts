import {
    GetSecretValueCommand,
    SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

const secretName = "tic-tac-toe/mongodb";

const client = new SecretsManagerClient({
    region: "ap-southeast-1",
});

export interface SecretData {
    connectionString: string;
}

export async function GetSecret(): Promise<SecretData> {
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName
            })
        );

        if (!response.SecretString) {
            throw new Error("SecretString is undefined");
        }

        // Parse the secret string into a JSON object
        const secretData: SecretData = JSON.parse(response.SecretString || "{}");
        console.log(secretData);
        return secretData;
        
    } catch (error) {
        console.log(error);
        console.error("Error retrieving secret:", error);
        throw error;
    }
}
