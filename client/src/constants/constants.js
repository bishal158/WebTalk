export const base_url = "http://localhost:5000";

export const socials = [
  {
    links: "https://www.facebook.com/mafuj.bishal.9",
    icon: "fa-brands fa-facebook",
    color: "#316FF6",
  },
  {
    links: "https://www.linkedin.com/in/mafuj-ahmed-bishal/",
    icon: "fa-brands fa-linkedin",
    color: "#0077b5",
  },
  {
    links: "https://www.instagram.com/mafujbishal/",
    icon: "fa-brands fa-instagram",
    color: "#fccc63",
  },
  {
    links: "https://twitter.com/BishalMafuj",
    icon: "fa-brands fa-twitter",
    color: "#1DA1F2",
  },
  {
    links: "https://github.com/bishal158",
    icon: "fa-brands fa-github",
    color: "#4078c0",
  },
];

export const userRoutes = [
  {
    name: "Home",
    to: "/",
    icon: "fa-solid fa-home",
  },
  {
    name: "Read Blogs",
    to: "/read-blogs",
    icon: "fa-brands fa-readme",
  },
  {
    name: "Write Blogs",
    to: "/write-blogs",
    icon: "fa-solid fa-pen-nib",
  },
];
export const generalRoutes = [
  {
    name: "Home",
    to: "/",
    icon: "fa-solid fa-home",
  },
  {
    name: "Sign In",
    to: "/login",
    icon: "fa-solid fa-right-to-bracket",
  },
  {
    name: "Sign Up",
    to: "/register",
    icon: "fa-solid fa-lock",
  },
];

// Editor

export const editorInit = {
  height: 500,
  menubar: false,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "emoticons",
    "importcss",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
    "insertdatetime",
    "codesample",
    "media",
  ],
  skin: "tinymce-5-dark",
  inline_styles: true,
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media insertdatetime table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | paste | save",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};
