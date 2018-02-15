# Create Database Schemas/Tables
## Single Tables:
data/migrations/xxxxx_initial.js
1. Keys Table: 
    * id: Type: Number/Integer, [Incremental]
    * description: Type: String, [Required/not Nullable]
    * Active: Type: Boolean, Default: false, Could be represented as string.
    * Positive: Type: text/string; [Text to display if Active = true]
    * Negative: Type: text/string; [Text to display if Active = false]
    * Position: Type: integer; the position in the row where this key belongs.
2. KeyGroups Table:
    * id: Type: Number/Integer, [Incremental]
    * Description: Type: String, [Required/not Nullable]
    * Separator: Type: String, Default: '/' [Text to display between keywords]
    * Toggle: Type: Boolean, Default: false, [Group is Toggle or not?]
        1. The toggle functionality is for implementation inside the view to toggle the active property of keywords within the group if this property is true inside the group table.
        2. This will enable implementation of smart groups enabling only 1 keyword on them to be active at a time, like Weight: [ + Gain ] / [ - Loss ] / [ Same ] only one of the can be active, and not both.
3. Division Table:
    * id: Type: Number/Integer, [Incremental]
    * Description: Type: String, [Required/not Nullable]
4. SOAP Table:
    * id: Type: Number/Integer, [Incremental]
    * Description: Type: String, [Required/not Nullable]

## Joint Tables:
1. KeyGroup_Key Table:
    * id: Type: Number/Integer, [Incremental]
    * KeywordId: Type: Number/Integer, ref: [Keyword > id]
    * KeywordGroupId: Type: Number/Integer, ref: [KeywordGroup > id]
2. Division_KeywordGroup Table:
    * id: Type: Number/Integer, [Incremental]
    * DivisionId: Type: Number/Integer, ref: [Division > id]
    * KeywordGroupId: Type: Number/Integer, ref: [KeywordGroup > id]
3. SOAP_Division Table:
    * id: Type: Number/Integer, [Incremental]
    * DivisionId: Type: Number/Integer, ref: [Division > id]
    * SOAPId: Type: Number/Integer, ref: [SOAP > id]

# Instruction for Population of data and implementation of database in the application.
# Creating Keywords:
1. post a JSON object like the one below:
    ```javascript
    {
        keyword: 'Fever',
        positive: 'the patient confirmed having fever',
        negative: 'the patient denies having fever'
    }
    ```
# Creating Groups:
1. Post a JSON object like the one below:
    ```javascript
    {
        description: 'Weight:',
        dividingText: '/',
        toggle: false
    }
    ```
2. Post to populate the KeywordGroup_Keyword table a JSON object like the ones bellow, for every keyword that the group is to include.
    ```javascript
    {
        KeywordGroupId: 1 // Referencing the ID of the Group
        KeywordId: 1, // Referencing the ID of the Keyword        
    }
    ```
    ```javascript
    {
        KeywordGroupId: 2 // Referencing the ID of the Group
        KeywordId: 5, // Referencing the ID of the Keyword        
    }
    ```

#BACKEND

# Registration: POST
1. Navigate to /register
2. Provide a user object following this template:
```JSON
{
    "email": "test@email.com",
    "password": "1234"
}
```
3. Server will return the userID# if successful.
4. Server will return the following error if unsuccessful:
```JSON
{
    "errorMessage": "unable to register user. Already registered? Try to log-in instead!"
}
```

# Login: POST
1. Navigate to /login
2. Provide a user object following this template:
```JSON
{
    "email": "test@email.com",
    "password": "1234"
}
```
3. Server will return an object like this one if successful:
```JSON
{
    "id": 7,
    "email": "test@email.com",
    "auth": true,
    "createdAt": "2018-02-13 19:40:33",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTg1NTQ5NjAsImRhdGEiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTUxODU1MTM2MH0.ijuolir7q2nkMa50Td6JLNLqfkdmUn7t7tuh89oEb_M"
}
```
4. Server will return this error if unsuccessful:
```JSON
{
    "errorMessage": "User not Authenticated, Please log-in again!"
}
```

# List Users: Get
1. Navigate to /users
2. Provide a JWT with the token that was given when the user logged in in the headers Authorization.
3. A list of users will be returned.
4. Server will return this error if unsuccessful:
```JSON
{
    "error": "Token invalid, please login",
    "message": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    }
}
```

# Delete a User: Delete
1. Navigate to /users [DELETE]
2. Provide a user object like the one bellow:
```JSON
{
    "email": "test@email.com",
    "password": "1234"
}
```
3. Server will return 1 if the user was deleted successfully.
4. Server will return an error if it was unable to delete the user.

# Update a User's Password: Put
1. Navigate to /update [PUT]
2. Provide a user object like the one bellow.
```JSON
{
    "email": "test@email.com",
    "password": "1234",
    "newPassword": "4321",
}
```
3. Server will return 1 if the user was updated successfully.
4. Server will return an error if it was unable to update the newPassword, or was unable to authenticate with the provided password.