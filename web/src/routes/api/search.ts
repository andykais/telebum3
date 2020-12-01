import { getAllShows } from "./profile";

export async function autoComplete(text: string) {
  // Ideally we do something better than grabbing all shows each
  // time someone types.
  const options = await getAllShows();

  let arr = [];
  var re = new RegExp(text, "ig");
  options.forEach((d: { name: string }) => {
    if (re.exec(d.name)) {
      arr.push(d.name);
    }
  });
  return arr;
}
