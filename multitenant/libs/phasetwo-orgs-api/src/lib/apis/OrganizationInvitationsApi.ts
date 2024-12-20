/* tslint:disable */
/* eslint-disable */
/**
 * Phase Two Admin REST API
 * This is a REST API reference for the Phase Two Keycloak custom resources. These are extensions to the standard [Keycloak Admin REST API](https://www.keycloak.org/docs-api/17.0/rest-api/index.html).  ### Base URI format Paths specified in the documentation are relative to the the base URI. - Format: `https://<host>:<port>/auth/realms` - Example: `https://app.phasetwo.io/auth/realms`  ### Authentication Authentication is achieved by using the `Authentication: Bearer <token>` header in all requests. This is either the access token received from a normal authentication, or by a request directly to the OpenID Connect token endpoint.  It is recommended that you use a Keycloak Admin Client, such as [this one for Javascript](https://github.com/keycloak/keycloak-nodejs-admin-client), as they take care of authentication, getting an access token, and refreshing it when it expires.  #### Client credentials grant example ``` POST /auth/realms/test-realm/protocol/openid-connect/token Host: app.phasetwo.io Accept: application/json Content-type: application/x-www-form-urlencoded  grant_type=client_credentials&client_id=admin-cli&client_secret=fd649804-3a74-4d69-acaa-8f065c6b7da1 ```  #### Password grant example ``` POST /auth/realms/test-realm/protocol/openid-connect/token Host: app.phasetwo.io Accept: application/json Content-type: application/x-www-form-urlencoded  grant_type=password&username=uname@foo.com&password=pwd123AZY&client_id=admin-cli ```  ### SDKs Modern API libraries are available for several common languages. These are available as open source at the links below, or you can choose to generate your own using our [OpenAPI spec file](https://raw.githubusercontent.com/p2-inc/phasetwo-docs/master/openapi.yaml).  | Language | Library | | --- | --- | | Java (and other JVM langs) | https://github.com/p2-inc/phasetwo-java | | JavaScript/TypeScript | https://github.com/p2-inc/phasetwo-js | | Python | https://github.com/p2-inc/phasetwo-python | 
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  InvitationRepresentation,
  InvitationRequestRepresentation,
} from '../models/index';
import {
    InvitationRepresentationFromJSON,
    InvitationRepresentationToJSON,
    InvitationRequestRepresentationFromJSON,
    InvitationRequestRepresentationToJSON,
} from '../models/index';

export interface AddOrganizationInvitationRequest {
    realm: string;
    orgId: string;
    invitationRequestRepresentation: InvitationRequestRepresentation;
}

export interface GetOrganizationInvitationsRequest {
    realm: string;
    orgId: string;
    search?: string;
    first?: number;
    max?: number;
}

export interface RemoveOrganizationInvitationRequest {
    realm: string;
    orgId: string;
    invitationId: string;
}

/**
 * 
 */
export class OrganizationInvitationsApi extends runtime.BaseAPI {

    /**
     * Create an invitation to an organization
     */
    async addOrganizationInvitationRaw(requestParameters: AddOrganizationInvitationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling addOrganizationInvitation().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling addOrganizationInvitation().'
            );
        }

        if (requestParameters['invitationRequestRepresentation'] == null) {
            throw new runtime.RequiredError(
                'invitationRequestRepresentation',
                'Required parameter "invitationRequestRepresentation" was null or undefined when calling addOrganizationInvitation().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/{orgId}/invitations`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InvitationRequestRepresentationToJSON(requestParameters['invitationRequestRepresentation']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create an invitation to an organization
     */
    async addOrganizationInvitation(requestParameters: AddOrganizationInvitationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.addOrganizationInvitationRaw(requestParameters, initOverrides);
    }

    /**
     * Get a paginated list of invitations to an organization, using an optional search query for email address.
     * Get organization invitations
     */
    async getOrganizationInvitationsRaw(requestParameters: GetOrganizationInvitationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<InvitationRepresentation>>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling getOrganizationInvitations().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling getOrganizationInvitations().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['search'] != null) {
            queryParameters['search'] = requestParameters['search'];
        }

        if (requestParameters['first'] != null) {
            queryParameters['first'] = requestParameters['first'];
        }

        if (requestParameters['max'] != null) {
            queryParameters['max'] = requestParameters['max'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/{orgId}/invitations`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InvitationRepresentationFromJSON));
    }

    /**
     * Get a paginated list of invitations to an organization, using an optional search query for email address.
     * Get organization invitations
     */
    async getOrganizationInvitations(requestParameters: GetOrganizationInvitationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<InvitationRepresentation>> {
        const response = await this.getOrganizationInvitationsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove a pending invitation
     */
    async removeOrganizationInvitationRaw(requestParameters: RemoveOrganizationInvitationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling removeOrganizationInvitation().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling removeOrganizationInvitation().'
            );
        }

        if (requestParameters['invitationId'] == null) {
            throw new runtime.RequiredError(
                'invitationId',
                'Required parameter "invitationId" was null or undefined when calling removeOrganizationInvitation().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/{orgId}/invitations/{invitationId}`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))).replace(`{${"invitationId"}}`, encodeURIComponent(String(requestParameters['invitationId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a pending invitation
     */
    async removeOrganizationInvitation(requestParameters: RemoveOrganizationInvitationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeOrganizationInvitationRaw(requestParameters, initOverrides);
    }

}
