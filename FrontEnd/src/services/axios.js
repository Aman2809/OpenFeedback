import axios from "axios";

export const BASE_URL="http://localhost:9292/api/v1/"

export const myAxios=axios.create({
    baseURL:BASE_URL
});

//checking if push problem is resolved in Frontend also or not.