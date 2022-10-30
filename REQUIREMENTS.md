# API Requirements
The Application must be able to communicate between a external API and a internal API for database requests. Users need to be able to browse an index of all their notes and quotes, see a specifics single note. The user must be also able to add, delete and update his note.

If the quote doesn't matches the mood of the user, then the user will be able to get a new quote.

Below are the backend endpoints and the data shapes which the frontend and backend needs.

## API Endpoints
#### Users
- Create `'/user/create' POST`
- ADDED Login `'/user/login' POST`

#### Notes
- Create [token required]`'/note/create' POST`
- Update [token required]`'/note/update/:note_id' PATCH`
- Get top five [token required]`'/note/:user_id' GET`
- Delete [token required]`'/note/delete' DELETE`

#### Quotes
- Create [token required]`'/quote/quote_post' POST`
- Create [token required]`'/quote/note_quote' POST`
- Get [token required]`'/quote/single/:note_id' GET`

## Data Shapes

#### Users
- user_id
- username
- password
```
TABLE: users (user_id INT GENERATED ALWAYS AS IDENTITY, username VARCHAR(30), password VARCHAR(250), PRIMARY KEY(user_id))
```

#### Notes
- note_id
- subject
- note
- user_id
- date
```
TABLE: notes (note_id INT GENERATED ALWAYS AS IDENTITY, subject VARCHAR(150), note TEXT, user_id INT, date BIGINT, PRIMARY KEY(note_id), CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id))
```

#### Quotes
- quote_id
- quote
- user_id
```
TABLE: quotes(quote_id INT PRIMARY KEY, quote TEXT, user_id INT, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id))
```

#### Quote_Notes
- quote_notes_id
- quote_id
- note_id
- user_id
```
TABLE: quote_notes(quote_notes_id INT GENERATED ALWAYS AS IDENTITY, quote_id INT, note_id INT, user_id INT, PRIMARY KEY(quote_notes_id), CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id), CONSTRAINT fk_quote_id FOREIGN KEY (quote_id) REFERENCES quotes(quote_id), CONSTRAINT fk_note_id FOREIGN KEY (note_id) REFERENCES notes(note_id))
```