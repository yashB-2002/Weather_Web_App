const http = require("http");
const fs = require("fs");
const requests = require("requests");
const mainFile = fs.readFileSync("index.html", "utf-8");
const func = (tdata, ogdata) => {
  let temp = tdata.replace("{%tempVal%}", ogdata.main.temp);
  temp = temp.replace("{%city%}", ogdata.name);
  temp = temp.replace("{%Country%}", ogdata.sys.country);
  temp = temp.replace("{%Mintemp%}", ogdata.main.temp_min);
  temp = temp.replace("{%Maxtemp%}", ogdata.main.temp_max);
  return temp;
};
http
  .createServer((req, res) => {
    if (req.url == "/") {
      requests("enter api you generated from your api key")
        .on("data", (chunk) => {
          const objData = JSON.parse(chunk);
          const arrdata = [objData];
          const dataFromApi = arrdata
            .map((val) => func(mainFile, val))
            .join("");
          res.write(dataFromApi);
        })
        .on("end", (err) => {
          if (err) console.log(err);
          res.end();
        });
    } else {
      res.end("File not found for reading");
    }
  })
  .listen(4000);
