export const checkPerm = (req, res, next) => {
    if (req.url === "/cities" && req.method === "GET") {
        next();
        return;
    }
    if (req.url === "/cities" && req.method !== "GET" && req.user.userRole === "admin") {
        next();
        return;
    }
    else {
        return res.status(403).send({
          message: "You do not have access to this resource",
        });
    }
}