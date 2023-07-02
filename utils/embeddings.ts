import {ModelType} from "@/types/chat";
import {KeyConfiguration} from "@/types/keyConfiguration";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";

export const getEmbeddings = (keyConfiguration: KeyConfiguration) => {
    if (keyConfiguration.apiType === ModelType.AZURE_OPENAI) {
        return new OpenAIEmbeddings({
            azureOpenAIApiKey: keyConfiguration.azureApiKey,
            azureOpenAIApiInstanceName: keyConfiguration.azureInstanceName,
            azureOpenAIApiDeploymentName: keyConfiguration.azureEmbeddingDeploymentName,
            azureOpenAIApiVersion: keyConfiguration.azureApiVersion,
        });
    } else {
        return new OpenAIEmbeddings({
            openAIApiKey: keyConfiguration.apiKey,
        });
    }
}