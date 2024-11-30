(async function () {
  const [year, day] = Deno.args;

  const path = `${Deno.cwd()}/${year}/${day}`;

  const input = await Deno.readTextFile(`${path}/input.txt`);
  const { part01, part02 } = await import(`${path}/solutions.ts`);

  console.log("part 01", part01(input));
  console.log("part 02", part02(input));
})();
