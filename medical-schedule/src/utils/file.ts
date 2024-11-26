export function b64EncodeUnicode(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}
function decodeHtml(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function b64DecodeUnicode(str: string | undefined): string {
  if (str) {
    try {
      const decodedBase64 = decodeURIComponent(
        Array.prototype.map
          .call(atob(str), (c: string) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return decodeHtml(decodedBase64);
    } catch (e) {
      console.error("Invalid Base64 string", e);
      return "";
    }
  }
  return "";
}
