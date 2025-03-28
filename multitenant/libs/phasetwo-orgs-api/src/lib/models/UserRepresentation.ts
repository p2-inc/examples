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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UserRepresentation
 */
export interface UserRepresentation {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UserRepresentation
     */
    attributes?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof UserRepresentation
     */
    createdTimestamp?: number;
    /**
     * 
     * @type {string}
     * @memberof UserRepresentation
     */
    email?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserRepresentation
     */
    emailVerified?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserRepresentation
     */
    enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserRepresentation
     */
    firstName?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserRepresentation
     */
    groups?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserRepresentation
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRepresentation
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRepresentation
     */
    username?: string;
}

/**
 * Check if a given object implements the UserRepresentation interface.
 */
export function instanceOfUserRepresentation(value: object): value is UserRepresentation {
    return true;
}

export function UserRepresentationFromJSON(json: any): UserRepresentation {
    return UserRepresentationFromJSONTyped(json, false);
}

export function UserRepresentationFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRepresentation {
    if (json == null) {
        return json;
    }
    return {
        
        'attributes': json['attributes'] == null ? undefined : json['attributes'],
        'createdTimestamp': json['createdTimestamp'] == null ? undefined : json['createdTimestamp'],
        'email': json['email'] == null ? undefined : json['email'],
        'emailVerified': json['emailVerified'] == null ? undefined : json['emailVerified'],
        'enabled': json['enabled'] == null ? undefined : json['enabled'],
        'firstName': json['firstName'] == null ? undefined : json['firstName'],
        'groups': json['groups'] == null ? undefined : json['groups'],
        'id': json['id'] == null ? undefined : json['id'],
        'lastName': json['lastName'] == null ? undefined : json['lastName'],
        'username': json['username'] == null ? undefined : json['username'],
    };
}

  export function UserRepresentationToJSON(json: any): UserRepresentation {
      return UserRepresentationToJSONTyped(json, false);
  }

  export function UserRepresentationToJSONTyped(value?: UserRepresentation | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'attributes': value['attributes'],
        'createdTimestamp': value['createdTimestamp'],
        'email': value['email'],
        'emailVerified': value['emailVerified'],
        'enabled': value['enabled'],
        'firstName': value['firstName'],
        'groups': value['groups'],
        'id': value['id'],
        'lastName': value['lastName'],
        'username': value['username'],
    };
}

