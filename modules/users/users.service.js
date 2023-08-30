import { readFile, writeFile } from 'node:fs/promises';

export const addUser = async (user) => {
  try {
    const filePath = new URL('data.json', import.meta.url);
    const usersString = await readFile(filePath, { encoding: 'utf8' });
    const users = JSON.parse(usersString).concat(user);

    await writeFile('data.json', JSON.stringify(users), 'utf8');

    return user;
  } catch (err) {
    console.error(err.message);
  }
}
