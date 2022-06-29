import {doGet, doDelete, doPostWithToken} from '../BaseAPI.js';

export function fetchSecrets(username, token){
	console.log("fetchSecrets", username, token);
	return doGet("http://localhost:8000/api/venus/vault/secrets?username="+username, token)
}

export function addSecret(secretData, token){
	console.log("addSecret", secretData, token);
	return doPostWithToken("http://localhost:8000/api/venus/vault/secret-upload", secretData, token)
}

export function deleteSecret(id, token){
	console.log("deleteSecret", id, token); 
	return doDelete(`http://localhost:8000/api/venus/vault/secret-delete?secretID=${id}`, token)
}