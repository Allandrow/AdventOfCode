const [year, day] = Deno.args;

const path = `https://adventofcode.com/${year}/day/${day}/input`;

const headers = new Headers({
  Cookie: `session=${Deno.env.get("AOC_SESSION")}`,
});

fetch(path, { headers })
  .then((response) => {
    if (response.ok) {
      return response.text();
    }

    throw new Error(response.statusText);
  })
  .then((data) => {
    Deno.writeTextFile(`${Deno.cwd()}/${year}/${day}/input.txt`, data.trim());
  }).catch((err) => {
    console.error(err);
  });
