import axios from "axios";

export default function GetCategoryList() {
  axios
    .get("/api/category/list")
    .then((res) => {
      sessionStorage.setItem("ctl", JSON.stringify(res.data.responseData));
    })
    .catch((e) => {
      console.log(e);
    });
}
