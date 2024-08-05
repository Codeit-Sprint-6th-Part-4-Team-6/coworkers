export const checkIsLink = (text: string) => {
  // URL을 찾기 위한 정규 표현식
  const urlPattern =
    /(\b(?:https?|ftp):\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?(?:\?[^\s]*)?(?:#[^\s]*)?)/gi;

  // URL을 <a> 태그로 감싸서 반환
  const convertedText = text.replace(urlPattern, (url) => {
    // URL 인코딩을 수행할 수 있는 필요에 따라 추가
    const encodedUrl = encodeURI(url);
    return `<a style="text-decoration: underline" href="${encodedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  return `${convertedText}<br />`;
};
