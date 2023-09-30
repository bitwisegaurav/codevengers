const copyButton = document.getElementById("copybtn");
const codeBlock = document.querySelector(".code pre");

copyButton.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  textArea.value = codeBlock.innerText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  copyButton.textContent = "✅";
  codeBlock.addEventListener("mouseleave", () => {
    copyButton.textContent = "Copy";
  });
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 2000);
});