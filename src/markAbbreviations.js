const dictionary = [
  ["NDIA", "Neurodiversity in Albertopolis"],
  ["ICT", "Information and communications technology"],
  ["RCM", "Royal College of Music"],
  ["RCA", "Royal College of Art"],
  ["NHLI", "National Heart and Lung Institute"],
  ["STEM", "Science, Technology, Engineering and Maths"],
  ["2E", "twice-exceptional"],
]

function markAbbreviations() {
  const nodes = document.querySelectorAll("p,h1,h2,h3,h4,h5,h6")
  nodes.forEach(node => {
    dictionary.forEach(d => {
      const re = new RegExp(`${d[0]}`, "g");
      const replacement = d[1];
      node.innerHTML = node.innerHTML.replace(re, `<abbr title="${replacement}">${d[0]}</abbr>`)
    })
  })
}

export { markAbbreviations };