module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// !(function (e, t, a) {
//   function s(e) {
//     document.body.classList.add(e ? "dark" : "light"),
//       document.body.classList.remove(e ? "light" : "dark")
//   }
//   var c = window.matchMedia("(prefers-color-scheme: dark)"),
//     o = "(prefers-color-scheme: dark)" === c.media,
//     r = null
//   try {
//     r = localStorage.getItem("theme")
//   } catch (e) {}
//   var l = null !== r
//   if ((l && (r = JSON.parse(r)), l)) s(r)
//   else if (o) s(c.matches), localStorage.setItem("theme", c.matches)
//   else {
//     var d = document.body.classList.contains("dark")
//     localStorage.setItem("theme", JSON.stringify(d))
//   }
// })()

// !(function () {
//   try {
//     var d = document.documentElement.classList
//     d.remove("light", "dark")
//     var e = localStorage.getItem("theme")
//     if ("system" === e || (!e && true)) {
//       var t = "(prefers-color-scheme: dark)",
//         m = window.matchMedia(t)
//       m.media !== t || m.matches ? d.add("dark") : d.add("light")
//     } else if (e) d.add(e)
//   } catch (e) {}
// })()
