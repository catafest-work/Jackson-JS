import {
  JsonProperty,
  JsonClassType,
  JsonAlias,
  ObjectMapper,
} from 'jackson-js';

class Person {
  @JsonProperty()
  @JsonClassType({ type: () => [Number] })
  id: number;

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  name: string;

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  @JsonAlias({ values: ['male', 'female'] })
  gender: string;

  @JsonProperty()
  @JsonClassType({ type: () => [Array, [DataPerson]] })
  data: DataPerson[] = [];
}

class DataPerson {
  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  email: string;

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  address: string;
}

const objectMapper = new ObjectMapper();

const jsonData =
  '{  "id": 1,  "name": "Catalin George Festila", "gender": "male",  "data": [{"email": "catafest@yahoo.com","address": "Str: Strada 1 Mai, bl.2, sc.2, ap.11, Falticeni, Suceava, Romania"}] }';

const result = objectMapper.parse<Person>(jsonData, {
  mainCreator: () => [Person],
});
console.log(result);

const appElement = document.getElementById('app');
const objectString = JSON.stringify(result);
if (appElement instanceof HTMLElement) {
  appElement.textContent = objectString;
}
