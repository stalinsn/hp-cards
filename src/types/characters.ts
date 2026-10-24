export interface HpApiCharacter {
  id: string;
  name?: string | null;
  alternate_names?: string[] | null;
  species?: string | null;
  gender?: string | null;
  house?: string | null;
  dateOfBirth?: string | null;
  yearOfBirth?: number | null;
  wizard?: boolean | null;
  ancestry?: string | null;
  eyeColour?: string | null;
  hairColour?: string | null;
  wand?: {
    wood?: string | null;
    core?: string | null;
    length?: number | null;
  } | null;
  patronus?: string | null;
  hogwartsStudent?: boolean | null;
  hogwartsStaff?: boolean | null;
  actor?: string | null;
  alternate_actors?: string[] | null;
  alive?: boolean | null;
  image?: string | null;
}
