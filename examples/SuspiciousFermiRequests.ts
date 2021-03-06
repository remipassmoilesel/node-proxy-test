// tslint:disable
import {HttpRequest} from "../proxy-server/HttpRequest";
import * as chai from "chai";

const assert = chai.assert;

export class SuspiciousFermiRequests {

    public request_postHttp1270018080AuthRealmsMasterLoginActionsAuthenticateCodeVgdum0jxshverlzpqulSy2xfldd7kvxcklw9o8ajjkExecution5b4f0445A04f40c29f5a0e956c3ab495ClientIdSecurityAdminConsoleTabIdRiy9k2tyjv8_0(http127001: string, u_5b4f0445_a04f_40c2_9f5a_0e956c3ab495: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `3fd992e2-5724-4761-a06d-255abd3d3997`,
            "url": `${http127001}:8080/auth/realms/master/login-actions/authenticate?code=VGDum0JXSHVERLzPQul-SY2XfldD7KVxCKLw9O8ajjk&execution=${u_5b4f0445_a04f_40c2_9f5a_0e956c3ab495}&client_id=security-admin-console&tab_id=rIY9K2tyjV8`,
            "method": `POST`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "cookie": `AUTH_SESSION_ID=a85add4b-eb78-4d76-bede-e35ae07f0785.e6512b0a863d; KC_RESTART=eyJhbGciOiJIUzI1NiIsImtpZCIgOiAiNGQ5NWNmMzktMTJkNy00MjdlLWE2NjItZGZiNDg4YWI4ZDM0In0.eyJjaWQiOiJzZWN1cml0eS1hZG1pbi1jb25zb2xlIiwicHR5Ijoib3BlbmlkLWNvbm5lY3QiLCJydXJpIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL2F1dGgvYWRtaW4vbWFzdGVyL2NvbnNvbGUvIiwiYWN0IjoiQVVUSEVOVElDQVRFIiwibm90ZXMiOnsic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUiLCJjb2RlX2NoYWxsZW5nZV9tZXRob2QiOiJwbGFpbiIsInJlZGlyZWN0X3VyaSI6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MC9hdXRoL2FkbWluL21hc3Rlci9jb25zb2xlLyIsInN0YXRlIjoiNWEzZWE0Y2QtODNkMy00ZWI5LWI1MzAtY2Q2NmRkMWZhZjQ1Iiwibm9uY2UiOiI1MjFkY2IyNy0xZDAxLTQ0MGUtOTZiYS1lNjI0NjU1Mjg4NzciLCJyZXNwb25zZV9tb2RlIjoiZnJhZ21lbnQifX0.8eeeP3SOXKMfOBl9UhTd4hfEaqmudbyIIaEJO8dux5M`,
                },
                "body": `username=admin&password=admin`,
            },
            "response": {
                "headers": {
                    "set-cookie": [
                        "KC_RESTART=; Version=1; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Max-Age=0; Path=/auth/realms/master; HttpOnly",
                        "KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsImtpZCIgOiAiNGQ5NWNmMzktMTJkNy00MjdlLWE2NjItZGZiNDg4YWI4ZDM0In0.eyJqdGkiOiJkZTczZGM3ZC0xMDY1LTQ1ZGMtOWRiYy00OTUyZDg5NzAyYmUiLCJleHAiOjE1MjAzMTUyMzksIm5iZiI6MCwiaWF0IjoxNTIwMjc5MjM5LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwic3ViIjoiNjNhYjg1NDYtMDQ3Yi00NmVhLWJjMjgtNTViMjAzMTFhNjE4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYTg1YWRkNGItZWI3OC00ZDc2LWJlZGUtZTM1YWUwN2YwNzg1IiwicmVzb3VyY2VfYWNjZXNzIjp7fSwic3RhdGVfY2hlY2tlciI6IlhYZ2lFeU9ZUGhDX3dvbDJXRHNOaVNOdzZEMG0wUzJBaWJ4bUF4dHk1Mm8ifQ.y7XFRVAWeo4fT_pVl5glmb_nR5mhWXDgCj5A6xCE5iY; Version=1; Path=/auth/realms/master; HttpOnly",
                        "KEYCLOAK_SESSION=master/63ab8546-047b-46ea-bc28-55b20311a618/a85add4b-eb78-4d76-bede-e35ae07f0785; Version=1; Expires=Tue, 06-Mar-2018 05:47:19 GMT; Max-Age=36000; Path=/auth/realms/master",
                        "KEYCLOAK_REMEMBER_ME=; Version=1; Comment=Expiring cookie; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Max-Age=0; Path=/auth/realms/master; HttpOnly"
                    ],
                    "p3p": `CP="This is not a P3P policy!"`,
                    "location": `http://127.0.0.1:8080/auth/admin/master/console/#state=5a3ea4cd-83d3-4eb9-b530-cd66dd1faf45&session_state=a85add4b-eb78-4d76-bede-e35ae07f0785&code=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..abjJVJt9x5hKGTiI33bBpA.RXaiYjO2M_1Az_GodoZdkm3ScRUd_FxMc0vrKWua3W754rcNELPTO_3PsjuTYbIkFju2fktRGRjSRZSFAQNANj6u9xVJMxfBefy4a1i_D8bhbszfh8jPLOhDJQfsEJTH_v8W2b7KR7C1DO8uu67tAofxYQQ_s4zeqC6H4HZz6QCceCy44DGPpt_n2P3YnwnjsZUSgRIHUC3QeJLZb7xGdXKniMGqH4B-k1Uahc_mPrUkAxlCcbQzyYddKnQka4IT.VkRN1SIMRfMc9RXjrWttyg`,
                },
                "body": ``,
            }
        };
    }

    public request_getHttp1270018080AuthAdminMasterConsoleConfig_0(http127001: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `aa289216-eb6b-46db-a874-5fbbf6b5471a`,
            "url": `${http127001}:8080/auth/admin/master/console/config`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {},
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `{"realm":"master","auth-server-url":"${http127001}:8080/auth","ssl-required":"external","resource":"security-admin-console","public-client":true,"confidential-port":0}`,
            }
        };
    }

    public request_postHttp1270018080AuthRealmsMasterProtocolOpenidConnectToken_0(http127001: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `1779377e-de24-497b-981e-2d20a29c6f01`,
            "url": `${http127001}:8080/auth/realms/master/protocol/openid-connect/token`,
            "method": `POST`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "cookie": `AUTH_SESSION_ID=a85add4b-eb78-4d76-bede-e35ae07f0785.e6512b0a863d; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsImtpZCIgOiAiNGQ5NWNmMzktMTJkNy00MjdlLWE2NjItZGZiNDg4YWI4ZDM0In0.eyJqdGkiOiJkZTczZGM3ZC0xMDY1LTQ1ZGMtOWRiYy00OTUyZDg5NzAyYmUiLCJleHAiOjE1MjAzMTUyMzksIm5iZiI6MCwiaWF0IjoxNTIwMjc5MjM5LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwic3ViIjoiNjNhYjg1NDYtMDQ3Yi00NmVhLWJjMjgtNTViMjAzMTFhNjE4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYTg1YWRkNGItZWI3OC00ZDc2LWJlZGUtZTM1YWUwN2YwNzg1IiwicmVzb3VyY2VfYWNjZXNzIjp7fSwic3RhdGVfY2hlY2tlciI6IlhYZ2lFeU9ZUGhDX3dvbDJXRHNOaVNOdzZEMG0wUzJBaWJ4bUF4dHk1Mm8ifQ.y7XFRVAWeo4fT_pVl5glmb_nR5mhWXDgCj5A6xCE5iY; KEYCLOAK_SESSION=master/63ab8546-047b-46ea-bc28-55b20311a618/a85add4b-eb78-4d76-bede-e35ae07f0785`,
                },
                "body": `code=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..abjJVJt9x5hKGTiI33bBpA.RXaiYjO2M_1Az_GodoZdkm3ScRUd_FxMc0vrKWua3W754rcNELPTO_3PsjuTYbIkFju2fktRGRjSRZSFAQNANj6u9xVJMxfBefy4a1i_D8bhbszfh8jPLOhDJQfsEJTH_v8W2b7KR7C1DO8uu67tAofxYQQ_s4zeqC6H4HZz6QCceCy44DGPpt_n2P3YnwnjsZUSgRIHUC3QeJLZb7xGdXKniMGqH4B-k1Uahc_mPrUkAxlCcbQzyYddKnQka4IT.VkRN1SIMRfMc9RXjrWttyg&grant_type=authorization_code&client_id=security-admin-console&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fauth%2Fadmin%2Fmaster%2Fconsole%2F`,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsempvX1AxMUlVakV3WmZ6UzBxRWphUmdZaG5FU3RXRWllYUlhWE5FSFM4In0.eyJqdGkiOiJlZGZmNTk2Yi01NjdmLTQzNTUtYWIzNi03N2U2MzI4NjI0NGEiLCJleHAiOjE1MjAyNzkyOTksIm5iZiI6MCwiaWF0IjoxNTIwMjc5MjM5LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjoic2VjdXJpdHktYWRtaW4tY29uc29sZSIsInN1YiI6IjYzYWI4NTQ2LTA0N2ItNDZlYS1iYzI4LTU1YjIwMzExYTYxOCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNlY3VyaXR5LWFkbWluLWNvbnNvbGUiLCJub25jZSI6IjUyMWRjYjI3LTFkMDEtNDQwZS05NmJhLWU2MjQ2NTUyODg3NyIsImF1dGhfdGltZSI6MTUyMDI3OTIzOSwic2Vzc2lvbl9zdGF0ZSI6ImE4NWFkZDRiLWViNzgtNGQ3Ni1iZWRlLWUzNWFlMDdmMDc4NSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOltdLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiJ9.Opm6LRk62UVJ3n2CV1ae6qjEwmL79BpMADbZX4WzVkICTkIzm212oMZG-FTjbuPWldjHlbATb5ETiHMEnWfs_P1ZpwJa5WImTRGs7ob60aImuhhVSvkyzR4jcUe9am4o4j_m9BZcOXfEOuuHVOZWCca59BXIedSxjKJxHGtNmYnVJIfDyNMG6Aozbo2SO0KHwCnVvX1u6t_bhJuXlt2c4AGY-FAavjDKtyvgz6vltMMcTCLW9Z3HAG_-nYYeUqmijAIR3utLZa5M_Bl0ilR2sGg2hsxsci6gQNtDEdlO7upEV-IkW2StKEm-cSv4k7rg1jk0YsQqgJ9ULTSv4khKSA","expires_in":60,"refresh_expires_in":1800,"refresh_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsempvX1AxMUlVakV3WmZ6UzBxRWphUmdZaG5FU3RXRWllYUlhWE5FSFM4In0.eyJqdGkiOiIyMjcyYjk2YS05ZTdmLTQ4ZjEtODM0YS0zNWE5OWQ5YmY2MmIiLCJleHAiOjE1MjAyODEwMzksIm5iZiI6MCwiaWF0IjoxNTIwMjc5MjM5LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjoic2VjdXJpdHktYWRtaW4tY29uc29sZSIsInN1YiI6IjYzYWI4NTQ2LTA0N2ItNDZlYS1iYzI4LTU1YjIwMzExYTYxOCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJzZWN1cml0eS1hZG1pbi1jb25zb2xlIiwibm9uY2UiOiI1MjFkY2IyNy0xZDAxLTQ0MGUtOTZiYS1lNjI0NjU1Mjg4NzciLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJhODVhZGQ0Yi1lYjc4LTRkNzYtYmVkZS1lMzVhZTA3ZjA3ODUiLCJyZXNvdXJjZV9hY2Nlc3MiOnt9fQ.SjqhCG79mJNjyLxsPGtCnvPmve-7DHszaWpcRKLIUBBZjHE7wlD0kr3COfiezdovyOqQhXlKykbGr0KSlTlfhNWbLD0LJRDxaHtc2WJu-DeCuuXC9pQPTdBmuCxUukZ-iL1E3ssGLkSquHYvxuq8DO-4LZa329Jcp1YQMETB1QyLWXMEU7AzsjJyBQUbqdXGPRoOGfxxz3V4Cwj2NxOTvbOwMlQ-JgZ_UiPng0ci_8XiZto3UIfakP0Cxc5ojCon0Wt8p5nkSrjp7j_qtNSZ1C9M5yIMrjDdhSUx4scO-ehsbXM7liuXOg3TcAAxG5Bssa5QkWVvSQavwMgQT6MfvA","token_type":"bearer","id_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsempvX1AxMUlVakV3WmZ6UzBxRWphUmdZaG5FU3RXRWllYUlhWE5FSFM4In0.eyJqdGkiOiI4ODY5NTFlMC0wNjNmLTRmOTgtOGFmNC0zNGQ3YjcxMDVjN2UiLCJleHAiOjE1MjAyNzkyOTksIm5iZiI6MCwiaWF0IjoxNTIwMjc5MjM5LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjoic2VjdXJpdHktYWRtaW4tY29uc29sZSIsInN1YiI6IjYzYWI4NTQ2LTA0N2ItNDZlYS1iYzI4LTU1YjIwMzExYTYxOCIsInR5cCI6IklEIiwiYXpwIjoic2VjdXJpdHktYWRtaW4tY29uc29sZSIsIm5vbmNlIjoiNTIxZGNiMjctMWQwMS00NDBlLTk2YmEtZTYyNDY1NTI4ODc3IiwiYXV0aF90aW1lIjoxNTIwMjc5MjM5LCJzZXNzaW9uX3N0YXRlIjoiYTg1YWRkNGItZWI3OC00ZDc2LWJlZGUtZTM1YWUwN2YwNzg1IiwiYWNyIjoiMSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.Ro5LyUQ8nPJjxGoezfIHCkm0ONsJwnGvYiBejAKExoYjs5OJ_ltyqfQ8gvT8cuExUXO-59q2NtvwBap2x_kQpH3IKK2PTDsiuex0viplqB3GQ94SUJ_cLDMyahEJo3Ft1K67tcgj7nrTtz-2ubK6wZRbdlzVMG9taT3fhqm_i-U4ugv7-RHQrQWTkGq5JCZJmfUAomKqDA99QSEtfphxrPljFmqxcIil_RivIRIeWvh_nc3wEspWGe3k2loVKgiEhmwOPjmxHAuriTfYD9S7TtL2beALJaj8vsiU3IZDWw3EkGIRozkjpzDf1NCcIVXRGdi338m5Tp_NWAHeJY3uSQ","not-before-policy":0,"session_state":"a85add4b-eb78-4d76-bede-e35ae07f0785","scope":""}`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminMasterConsoleWhoami_0(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `e57b50de-c8d1-4937-a7cf-630289c3acc0`,
            "url": `${http127001}:8080/auth/admin/master/console/whoami`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `{"userId":"63ab8546-047b-46ea-bc28-55b20311a618","realm":"master","displayName":"admin","createRealm":true,"realm_access":{"master":["view-realm","view-identity-providers","manage-identity-providers","impersonation","create-client","manage-users","query-realms","view-authorization","query-clients","query-users","manage-events","manage-realm","view-events","view-users","view-clients","manage-authorization","manage-clients","query-groups"]}}`,
            }
        };
    }

    public request_getHttp1270018080AuthRealmsMasterProtocolOpenidConnectLoginStatusIframeHtmlInitClientIdSecurityAdminConsoleOriginHttp3a2f2f1270013a8080_0(http127001: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `1f0a3e3e-e12a-42a6-9f21-e4844fb05eb7`,
            "url": `${http127001}:8080/auth/realms/master/protocol/openid-connect/login-status-iframe.html/init?client_id=security-admin-console&origin=http%3A%2F%2F127.0.0.1%3A8080`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "cookie": `AUTH_SESSION_ID=a85add4b-eb78-4d76-bede-e35ae07f0785.e6512b0a863d; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsImtpZCIgOiAiNGQ5NWNmMzktMTJkNy00MjdlLWE2NjItZGZiNDg4YWI4ZDM0In0.eyJqdGkiOiJkZTczZGM3ZC0xMDY1LTQ1ZGMtOWRiYy00OTUyZDg5NzAyYmUiLCJleHAiOjE1MjAzMTUyMzksIm5iZiI6MCwiaWF0IjoxNTIwMjc5MjM5LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwic3ViIjoiNjNhYjg1NDYtMDQ3Yi00NmVhLWJjMjgtNTViMjAzMTFhNjE4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYTg1YWRkNGItZWI3OC00ZDc2LWJlZGUtZTM1YWUwN2YwNzg1IiwicmVzb3VyY2VfYWNjZXNzIjp7fSwic3RhdGVfY2hlY2tlciI6IlhYZ2lFeU9ZUGhDX3dvbDJXRHNOaVNOdzZEMG0wUzJBaWJ4bUF4dHk1Mm8ifQ.y7XFRVAWeo4fT_pVl5glmb_nR5mhWXDgCj5A6xCE5iY; KEYCLOAK_SESSION=master/63ab8546-047b-46ea-bc28-55b20311a618/a85add4b-eb78-4d76-bede-e35ae07f0785`,
                },
                "body": ``,
            },
            "response": {
                "headers": {},
                "body": ``,
            }
        };
    }

    public request_getHttp1270018080AuthResources343FinalAdminKeycloakLibComponentsFontAwesomeFontsFontawesomeWebfontWoff2V430_0(http127001: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `6833072a-b37e-4e8c-a24c-d5e15fcf5597`,
            "url": `${http127001}:8080/auth/resources/3.4.3.final/admin/keycloak/lib/components/font-awesome/fonts/fontawesome-webfont.woff2?v=4.3.0`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {},
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/octet-stream`,
                },
                "body": `Body was ignored`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealmsMasterAuthenticationRequiredActions_0(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `51e625a6-50de-4cbe-8c9e-d0eed522bdbd`,
            "url": `${http127001}:8080/auth/admin/realms/master/authentication/required-actions`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `[{"alias":"terms_and_conditions","name":"Terms and Conditions","enabled":false,"defaultAction":false,"config":{}},{"alias":"UPDATE_PASSWORD","name":"Update Password","enabled":true,"defaultAction":false,"config":{}},{"alias":"CONFIGURE_TOTP","name":"Configure OTP","enabled":true,"defaultAction":false,"config":{}},{"alias":"UPDATE_PROFILE","name":"Update Profile","enabled":true,"defaultAction":false,"config":{}},{"alias":"VERIFY_EMAIL","name":"Verify Email","enabled":true,"defaultAction":false,"config":{}}]`,
            }
        };
    }

    public request_postHttp1270018080AuthAdminRealmsMasterUsers_0(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `68b1d538-a0e0-47c6-a4cb-eba107254608`,
            "url": `${http127001}:8080/auth/admin/realms/master/users`,
            "method": `POST`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": `{"enabled":true,"attributes":{},"username":"testuser","emailVerified":"","email":"testuser@mail.com","firstName":"Test","lastName":"Test"}`,
            },
            "response": {
                "headers": {
                    "location": `http://127.0.0.1:8080/auth/admin/realms/master/users/5522532e-69ab-4868-a014-c4095d69f72d`,
                },
                "body": ``,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealmsMasterUsers5522532e69ab4868A014C4095d69f72d_0(http127001: string, authorization: string, u_5522532e_69ab_4868_a014_c4095d69f72d: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `a88d3f1c-e997-49fe-9fd1-f86dedbebe1f`,
            "url": `${http127001}:8080/auth/admin/realms/master/users/${u_5522532e_69ab_4868_a014_c4095d69f72d}`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `{"id":"5522532e-69ab-4868-a014-c4095d69f72d","createdTimestamp":1520279279132,"username":"testuser","enabled":true,"totp":false,"emailVerified":false,"firstName":"Test","lastName":"Test","email":"testuser@mail.com","disableableCredentialTypes":[],"requiredActions":[],"notBefore":0,"access":{"manageGroupMembership":true,"view":true,"mapRoles":true,"impersonate":true,"manage":true}}`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealmsMaster_0(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `6223618c-df73-4469-97b9-2247c6ef5327`,
            "url": `${http127001}:8080/auth/admin/realms/master`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `{"id":"master","realm":"master","displayName":"Keycloak","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","notBefore":0,"revokeRefreshToken":false,"refreshTokenMaxReuse":0,"accessTokenLifespan":60,"accessTokenLifespanForImplicitFlow":900,"ssoSessionIdleTimeout":1800,"ssoSessionMaxLifespan":36000,"offlineSessionIdleTimeout":2592000,"accessCodeLifespan":60,"accessCodeLifespanUserAction":300,"accessCodeLifespanLogin":1800,"actionTokenGeneratedByAdminLifespan":43200,"actionTokenGeneratedByUserLifespan":300,"enabled":true,"sslRequired":"external","registrationAllowed":false,"registrationEmailAsUsername":false,"rememberMe":false,"verifyEmail":false,"loginWithEmailAllowed":true,"duplicateEmailsAllowed":false,"resetPasswordAllowed":false,"editUsernameAllowed":false,"bruteForceProtected":false,"permanentLockout":false,"maxFailureWaitSeconds":900,"minimumQuickLoginWaitSeconds":60,"waitIncrementSeconds":60,"quickLoginCheckMilliSeconds":1000,"maxDeltaTimeSeconds":43200,"failureFactor":30,"defaultRoles":["offline_access","uma_authorization"],"requiredCredentials":["password"],"otpPolicyType":"totp","otpPolicyAlgorithm":"HmacSHA1","otpPolicyInitialCounter":0,"otpPolicyDigits":6,"otpPolicyLookAheadWindow":1,"otpPolicyPeriod":30,"otpSupportedApplications":["FreeOTP","Google Authenticator"],"browserSecurityHeaders":{"xContentTypeOptions":"nosniff","xRobotsTag":"none","xFrameOptions":"SAMEORIGIN","xXSSProtection":"1; mode=block","contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","strictTransportSecurity":"max-age=31536000; includeSubDomains"},"smtpServer":{},"eventsEnabled":false,"eventsListeners":["jboss-logging"],"enabledEventTypes":[],"adminEventsEnabled":false,"adminEventsDetailsEnabled":false,"internationalizationEnabled":false,"supportedLocales":[],"browserFlow":"browser","registrationFlow":"registration","directGrantFlow":"direct grant","resetCredentialsFlow":"reset credentials","clientAuthenticationFlow":"clients","dockerAuthenticationFlow":"docker auth","attributes":{"_browser_header.xXSSProtection":"1; mode=block","_browser_header.strictTransportSecurity":"max-age=31536000; includeSubDomains","_browser_header.xFrameOptions":"SAMEORIGIN","quickLoginCheckMilliSeconds":"1000","permanentLockout":"false","displayName":"Keycloak","_browser_header.xRobotsTag":"none","maxFailureWaitSeconds":"900","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","minimumQuickLoginWaitSeconds":"60","failureFactor":"30","maxDeltaTimeSeconds":"43200","_browser_header.xContentTypeOptions":"nosniff","bruteForceProtected":"false","_browser_header.contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","waitIncrementSeconds":"60"}}`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealms_0(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `af64efd7-ff30-4fb7-bf3d-476ef84c3684`,
            "url": `${http127001}:8080/auth/admin/realms`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `[{"id":"master","realm":"master","displayName":"Keycloak","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","notBefore":0,"revokeRefreshToken":false,"refreshTokenMaxReuse":0,"accessTokenLifespan":60,"accessTokenLifespanForImplicitFlow":900,"ssoSessionIdleTimeout":1800,"ssoSessionMaxLifespan":36000,"offlineSessionIdleTimeout":2592000,"accessCodeLifespan":60,"accessCodeLifespanUserAction":300,"accessCodeLifespanLogin":1800,"actionTokenGeneratedByAdminLifespan":43200,"actionTokenGeneratedByUserLifespan":300,"enabled":true,"sslRequired":"external","registrationAllowed":false,"registrationEmailAsUsername":false,"rememberMe":false,"verifyEmail":false,"loginWithEmailAllowed":true,"duplicateEmailsAllowed":false,"resetPasswordAllowed":false,"editUsernameAllowed":false,"bruteForceProtected":false,"permanentLockout":false,"maxFailureWaitSeconds":900,"minimumQuickLoginWaitSeconds":60,"waitIncrementSeconds":60,"quickLoginCheckMilliSeconds":1000,"maxDeltaTimeSeconds":43200,"failureFactor":30,"defaultRoles":["offline_access","uma_authorization"],"requiredCredentials":["password"],"otpPolicyType":"totp","otpPolicyAlgorithm":"HmacSHA1","otpPolicyInitialCounter":0,"otpPolicyDigits":6,"otpPolicyLookAheadWindow":1,"otpPolicyPeriod":30,"otpSupportedApplications":["FreeOTP","Google Authenticator"],"browserSecurityHeaders":{"xContentTypeOptions":"nosniff","xRobotsTag":"none","xFrameOptions":"SAMEORIGIN","xXSSProtection":"1; mode=block","contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","strictTransportSecurity":"max-age=31536000; includeSubDomains"},"smtpServer":{},"eventsEnabled":false,"eventsListeners":["jboss-logging"],"enabledEventTypes":[],"adminEventsEnabled":false,"adminEventsDetailsEnabled":false,"internationalizationEnabled":false,"supportedLocales":[],"browserFlow":"browser","registrationFlow":"registration","directGrantFlow":"direct grant","resetCredentialsFlow":"reset credentials","clientAuthenticationFlow":"clients","dockerAuthenticationFlow":"docker auth","attributes":{"_browser_header.xXSSProtection":"1; mode=block","_browser_header.strictTransportSecurity":"max-age=31536000; includeSubDomains","_browser_header.xFrameOptions":"SAMEORIGIN","quickLoginCheckMilliSeconds":"1000","permanentLockout":"false","displayName":"Keycloak","_browser_header.xRobotsTag":"none","maxFailureWaitSeconds":"900","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","minimumQuickLoginWaitSeconds":"60","failureFactor":"30","maxDeltaTimeSeconds":"43200","_browser_header.xContentTypeOptions":"nosniff","bruteForceProtected":"false","_browser_header.contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","waitIncrementSeconds":"60"}}]`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealmsMasterAuthenticationRequiredActions_1(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `6b289e8c-017d-4b57-8273-b013205e07df`,
            "url": `${http127001}:8080/auth/admin/realms/master/authentication/required-actions`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `[{"alias":"terms_and_conditions","name":"Terms and Conditions","enabled":false,"defaultAction":false,"config":{}},{"alias":"UPDATE_PASSWORD","name":"Update Password","enabled":true,"defaultAction":false,"config":{}},{"alias":"CONFIGURE_TOTP","name":"Configure OTP","enabled":true,"defaultAction":false,"config":{}},{"alias":"UPDATE_PROFILE","name":"Update Profile","enabled":true,"defaultAction":false,"config":{}},{"alias":"VERIFY_EMAIL","name":"Verify Email","enabled":true,"defaultAction":false,"config":{}}]`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealmsMasterAttackDetectionBruteForceUsers5522532e69ab4868A014C4095d69f72d_0(http127001: string, authorization: string, u_5522532e_69ab_4868_a014_c4095d69f72d: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `85577ae2-238b-48c8-a0ab-75ff566463a5`,
            "url": `${http127001}:8080/auth/admin/realms/master/attack-detection/brute-force/users/${u_5522532e_69ab_4868_a014_c4095d69f72d}`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `{"numFailures":0,"disabled":false,"lastIPFailure":"n/a","lastFailure":0}`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealmsMaster_1(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `7beec8b0-c953-4bb7-9ae4-ea3dd067c1cb`,
            "url": `${http127001}:8080/auth/admin/realms/master`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `{"id":"master","realm":"master","displayName":"Keycloak","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","notBefore":0,"revokeRefreshToken":false,"refreshTokenMaxReuse":0,"accessTokenLifespan":60,"accessTokenLifespanForImplicitFlow":900,"ssoSessionIdleTimeout":1800,"ssoSessionMaxLifespan":36000,"offlineSessionIdleTimeout":2592000,"accessCodeLifespan":60,"accessCodeLifespanUserAction":300,"accessCodeLifespanLogin":1800,"actionTokenGeneratedByAdminLifespan":43200,"actionTokenGeneratedByUserLifespan":300,"enabled":true,"sslRequired":"external","registrationAllowed":false,"registrationEmailAsUsername":false,"rememberMe":false,"verifyEmail":false,"loginWithEmailAllowed":true,"duplicateEmailsAllowed":false,"resetPasswordAllowed":false,"editUsernameAllowed":false,"bruteForceProtected":false,"permanentLockout":false,"maxFailureWaitSeconds":900,"minimumQuickLoginWaitSeconds":60,"waitIncrementSeconds":60,"quickLoginCheckMilliSeconds":1000,"maxDeltaTimeSeconds":43200,"failureFactor":30,"defaultRoles":["offline_access","uma_authorization"],"requiredCredentials":["password"],"otpPolicyType":"totp","otpPolicyAlgorithm":"HmacSHA1","otpPolicyInitialCounter":0,"otpPolicyDigits":6,"otpPolicyLookAheadWindow":1,"otpPolicyPeriod":30,"otpSupportedApplications":["FreeOTP","Google Authenticator"],"browserSecurityHeaders":{"xContentTypeOptions":"nosniff","xRobotsTag":"none","xFrameOptions":"SAMEORIGIN","xXSSProtection":"1; mode=block","contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","strictTransportSecurity":"max-age=31536000; includeSubDomains"},"smtpServer":{},"eventsEnabled":false,"eventsListeners":["jboss-logging"],"enabledEventTypes":[],"adminEventsEnabled":false,"adminEventsDetailsEnabled":false,"internationalizationEnabled":false,"supportedLocales":[],"browserFlow":"browser","registrationFlow":"registration","directGrantFlow":"direct grant","resetCredentialsFlow":"reset credentials","clientAuthenticationFlow":"clients","dockerAuthenticationFlow":"docker auth","attributes":{"_browser_header.xXSSProtection":"1; mode=block","_browser_header.strictTransportSecurity":"max-age=31536000; includeSubDomains","_browser_header.xFrameOptions":"SAMEORIGIN","quickLoginCheckMilliSeconds":"1000","permanentLockout":"false","displayName":"Keycloak","_browser_header.xRobotsTag":"none","maxFailureWaitSeconds":"900","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","minimumQuickLoginWaitSeconds":"60","failureFactor":"30","maxDeltaTimeSeconds":"43200","_browser_header.xContentTypeOptions":"nosniff","bruteForceProtected":"false","_browser_header.contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","waitIncrementSeconds":"60"}}`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealms_1(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `2da6c7b9-40a0-4ff8-afd4-49b4ac41c9c6`,
            "url": `${http127001}:8080/auth/admin/realms`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `[{"id":"master","realm":"master","displayName":"Keycloak","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","notBefore":0,"revokeRefreshToken":false,"refreshTokenMaxReuse":0,"accessTokenLifespan":60,"accessTokenLifespanForImplicitFlow":900,"ssoSessionIdleTimeout":1800,"ssoSessionMaxLifespan":36000,"offlineSessionIdleTimeout":2592000,"accessCodeLifespan":60,"accessCodeLifespanUserAction":300,"accessCodeLifespanLogin":1800,"actionTokenGeneratedByAdminLifespan":43200,"actionTokenGeneratedByUserLifespan":300,"enabled":true,"sslRequired":"external","registrationAllowed":false,"registrationEmailAsUsername":false,"rememberMe":false,"verifyEmail":false,"loginWithEmailAllowed":true,"duplicateEmailsAllowed":false,"resetPasswordAllowed":false,"editUsernameAllowed":false,"bruteForceProtected":false,"permanentLockout":false,"maxFailureWaitSeconds":900,"minimumQuickLoginWaitSeconds":60,"waitIncrementSeconds":60,"quickLoginCheckMilliSeconds":1000,"maxDeltaTimeSeconds":43200,"failureFactor":30,"defaultRoles":["offline_access","uma_authorization"],"requiredCredentials":["password"],"otpPolicyType":"totp","otpPolicyAlgorithm":"HmacSHA1","otpPolicyInitialCounter":0,"otpPolicyDigits":6,"otpPolicyLookAheadWindow":1,"otpPolicyPeriod":30,"otpSupportedApplications":["FreeOTP","Google Authenticator"],"browserSecurityHeaders":{"xContentTypeOptions":"nosniff","xRobotsTag":"none","xFrameOptions":"SAMEORIGIN","xXSSProtection":"1; mode=block","contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","strictTransportSecurity":"max-age=31536000; includeSubDomains"},"smtpServer":{},"eventsEnabled":false,"eventsListeners":["jboss-logging"],"enabledEventTypes":[],"adminEventsEnabled":false,"adminEventsDetailsEnabled":false,"internationalizationEnabled":false,"supportedLocales":[],"browserFlow":"browser","registrationFlow":"registration","directGrantFlow":"direct grant","resetCredentialsFlow":"reset credentials","clientAuthenticationFlow":"clients","dockerAuthenticationFlow":"docker auth","attributes":{"_browser_header.xXSSProtection":"1; mode=block","_browser_header.strictTransportSecurity":"max-age=31536000; includeSubDomains","_browser_header.xFrameOptions":"SAMEORIGIN","quickLoginCheckMilliSeconds":"1000","permanentLockout":"false","displayName":"Keycloak","_browser_header.xRobotsTag":"none","maxFailureWaitSeconds":"900","displayNameHtml":"<div class=\"kc-logo-text\"><span>Keycloak</span></div>","minimumQuickLoginWaitSeconds":"60","failureFactor":"30","maxDeltaTimeSeconds":"43200","_browser_header.xContentTypeOptions":"nosniff","bruteForceProtected":"false","_browser_header.contentSecurityPolicy":"frame-src 'self'; frame-ancestors 'self'; object-src 'none';","waitIncrementSeconds":"60"}}]`,
            }
        };
    }

    public request_getHttp1270018080AuthAdminRealmsMasterUsersFirst0Max20_0(http127001: string, authorization: string, defaultArg0?: any, defaultArg1?: any, defaultArg2?: any): HttpRequest {
        return {
            "requestId": `f244639e-4ba5-4a4d-8732-edf0ac04b070`,
            "url": `${http127001}:8080/auth/admin/realms/master/users?first=0&max=20`,
            "method": `GET`,
            "statusCode": 200,
            "request": {
                "headers": {
                    "authorization": `${authorization}`,
                },
                "body": ``,
            },
            "response": {
                "headers": {
                    "content-type": `application/json`,
                },
                "body": `[{"id":"63ab8546-047b-46ea-bc28-55b20311a618","createdTimestamp":1520278992914,"username":"admin","enabled":true,"totp":false,"emailVerified":false,"disableableCredentialTypes":["password"],"requiredActions":[],"notBefore":0,"access":{"manageGroupMembership":true,"view":true,"mapRoles":true,"impersonate":true,"manage":true}},{"id":"5522532e-69ab-4868-a014-c4095d69f72d","createdTimestamp":1520279279132,"username":"testuser","enabled":true,"totp":false,"emailVerified":false,"firstName":"Test","lastName":"Test","email":"testuser@mail.com","disableableCredentialTypes":[],"requiredActions":[],"notBefore":0,"access":{"manageGroupMembership":true,"view":true,"mapRoles":true,"impersonate":true,"manage":true}}]`,
            }
        };
    }


}
