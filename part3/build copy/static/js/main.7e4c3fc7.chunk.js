(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{15:function(t,n,e){},40:function(t,n,e){"use strict";e.r(n);var c=e(2),o=e(16),r=e.n(o),a=e(6),i=e(3),u=e(0),s=function(t){var n=t.note,e=t.toggleImportant,c=n.important?"make not important":"make important";return Object(u.jsx)("div",{children:Object(u.jsxs)("li",{children:[n.content,Object(u.jsx)("button",{onClick:e,children:c})]})})},j=e(4),f=e.n(j),l="api/notes",b=function(){return f.a.get(l).then((function(t){return t.data}))},d=function(t){return f.a.post(l,t).then((function(t){return t.data}))},h=function(t,n){return f.a.put("".concat(l,"/").concat(t),n).then((function(t){return t.data}))},O=(e(15),function(t){var n=t.message;return null===n?null:Object(u.jsx)("div",{className:"error",children:n})}),m=function(){var t=Object(c.useState)([]),n=Object(i.a)(t,2),e=n[0],o=n[1],r=Object(c.useState)("a new note..."),j=Object(i.a)(r,2),f=j[0],l=j[1],m=Object(c.useState)(),p=Object(i.a)(m,2),v=p[0],g=p[1],x=Object(c.useState)("have a error ..."),S=Object(i.a)(x,2),k=S[0],w=S[1];Object(c.useEffect)((function(){console.log("effect"),b().then((function(t){o(t)}))}),[]);var I=v?e:e.filter((function(t){return!0===t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(O,{message:k}),Object(u.jsxs)("button",{onClick:function(){return g(!v)},children:["show ",v?"important":"all"]}),Object(u.jsx)("ul",{children:I&&I.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportant:function(){!function(t){var n=e.find((function(n){return n.id===t})),c=Object(a.a)(Object(a.a)({},n),{},{important:!n.important});h(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n})))})).catch((function(e){w("the note '".concat(n.content,"' was already deleted from server")),setTimeout((function(){w(null)}),5e3),o((function(){return n.filter((function(n){return n.id!==t}))}))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:f,date:(new Date).toISOString(),important:Math.random()<.5};d(n).then((function(t){o(e.concat(t)),l("")}))},children:[Object(u.jsx)("input",{value:f,onChange:function(t){console.log(t.target.value),l(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]})]})};r.a.render(Object(u.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.7e4c3fc7.chunk.js.map