import {Response} from "express";
import {db} from "./config/firebase";
import {Timestamp} from "firebase-admin/firestore";

// enum ObjectName {
//     Slug = "slug",
//     Taps = "taps",
//     Deer = "deer",
//     Turkey = "turkey",
// }

type Geopoint = {
  latitude: number,
  longtitude: number,
}

type MapPointType = {
    userId: string,
    communityId: string,
    objectName: string,
    coordinate: Geopoint,
    time: Timestamp,
}

type PostRequest = {
    body: MapPointType,
}

const addMapPoint = async (req: PostRequest, res: Response) => {
  const {userId, communityId, objectName, coordinate, time} = req.body;
  console.log({userId, communityId, objectName, coordinate, time});

  try {
    const map = db.collection("map").doc();
    console.log(map);
    const mapPoint = {
      id: map.id,
      userId,
      communityId,
      objectName,
      coordinate,
      time,
    };

    map.set(mapPoint);

    res.status(200).send({
      status: "success",
      message: "map point added successfully",
      data: mapPoint,
    });
  } catch (error) {
    res.status(500).json("We found an error posting your request!");
  }
};

export {addMapPoint};
