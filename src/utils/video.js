export function getYoutubeVideoId(text) {
  if (!text) return text;

  const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
  const fullreg =
    /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

  let resultVideoId = text;

  // get all the matches for youtube links using the first regex
  const match = text.match(fullreg);
  if (match && match.length > 0) {
    // get all links and put in placeholders
    const matchlinks = text.match(linkreg);
    if (matchlinks && matchlinks.length > 0) {
      for (var i = 0; i < matchlinks.length; i++) {
        resultVideoId = resultVideoId.replace(matchlinks[i], '#placeholder' + i + '#');
      }
    }

    // now go through the matches one by one
    for (var i = 0; i < match.length; i++) {
      // get the key out of the match using the second regex
      let matchParts = match[i].split(regex);
      // replace the full match with the embedded youtube code
      resultVideoId = resultVideoId.replace(match[i], matchParts[1]);
    }

    // ok now put our links back where the placeholders were.
    if (matchlinks && matchlinks.length > 0) {
      for (var i = 0; i < matchlinks.length; i++) {
        resultVideoId = resultVideoId.replace('#placeholder' + i + '#', matchlinks[i]);
      }
    }
  }

  return resultVideoId;
}
