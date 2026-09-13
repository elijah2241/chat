
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5050;
const HOST = "0.0.0.0";

/*
============================================================
FIREBASE
============================================================

Your Firebase Realtime Database URL.

You can also set this as an environment variable:

FIREBASE_DATABASE_URL

Example:
https://your-project-default-rtdb.firebaseio.com
*/

const FIREBASE_DATABASE_URL =
    process.env.FIREBASE_DATABASE_URL ||
    "https://global-chat-61d29-default-rtdb.firebaseio.com";

let visitorNumber = 0;

const visitors = new Map();

const userCache = new Map();


/*
============================================================
GET USER INFORMATION FROM FIREBASE
============================================================
*/

async function getFirebaseUser(userId) {

    if (!userId) {
        return null;
    }

    // Use cached result if available
    if (userCache.has(userId)) {
        return userCache.get(userId);
    }

    try {

        const url =
            `${FIREBASE_DATABASE_URL}/users/` +
            `${encodeURIComponent(userId)}.json`;

        const response = await fetch(url);

        if (!response.ok) {

            console.log(
                `[FIREBASE] Failed to get user ${userId}: ` +
                `${response.status}`
            );

            return null;
        }

        const user = await response.json();

        if (!user) {
            return null;
        }

        const userInfo = {
            id: userId,
            name:
                user.name ||
                user.username ||
                "Unknown User"
        };

        userCache.set(userId, userInfo);

        return userInfo;

    } catch (error) {

        console.log(
            "[FIREBASE] Error getting user:",
            error.message
        );

        return null;
    }
}


/*
============================================================
GET USER ID
============================================================

The browser can send the ID using:

X-User-ID

or:

Cookie:
siteUserId=USER-...

or:

?userId=USER-...
*/

function getUserId(req) {

    // Header
    if (req.headers["x-user-id"]) {

        return String(
            req.headers["x-user-id"]
        ).trim();
    }

    // Cookie
    const cookieHeader =
        req.headers.cookie || "";

    const cookies = {};

    cookieHeader
        .split(";")
        .forEach(cookie => {

            const parts =
                cookie.trim().split("=");

            if (parts.length >= 2) {

                const key = parts.shift();

                const value =
                    parts.join("=");

                cookies[key] =
                    decodeURIComponent(value);
            }
        });

    if (cookies.siteUserId) {

        return cookies.siteUserId;
    }

    // URL
    if (req.query && req.query.userId) {

        return String(
            req.query.userId
        ).trim();
    }

    return null;
}


/*
============================================================
DEVICE INFORMATION
============================================================
*/

function getDeviceInfo(userAgent = "") {

    let device = "Unknown";
    let os = "Unknown";
    let browser = "Unknown";


    // DEVICE

    if (/iPhone/i.test(userAgent)) {

        device = "iPhone";

    } else if (/iPad/i.test(userAgent)) {

        device = "iPad";

    } else if (/Android/i.test(userAgent)) {

        device =
            /Mobile/i.test(userAgent)
                ? "Android Phone"
                : "Android Tablet";

    } else if (/Windows Phone/i.test(userAgent)) {

        device = "Windows Phone";

    } else if (/Macintosh/i.test(userAgent)) {

        device = "Mac";

    } else if (/Windows/i.test(userAgent)) {

        device = "Windows PC";

    } else if (/Linux/i.test(userAgent)) {

        device = "Linux PC";
    }


    // OPERATING SYSTEM

    if (/Windows NT 10.0/i.test(userAgent)) {

        os = "Windows 10/11";

    } else if (/Windows NT 6.3/i.test(userAgent)) {

        os = "Windows 8.1";

    } else if (/Windows NT 6.2/i.test(userAgent)) {

        os = "Windows 8";

    } else if (/Windows NT 6.1/i.test(userAgent)) {

        os = "Windows 7";

    } else if (/iPhone OS/i.test(userAgent)) {

        os = "iOS";

    } else if (/iPad.*OS/i.test(userAgent)) {

        os = "iPadOS";

    } else if (/Android/i.test(userAgent)) {

        os = "Android";

    } else if (/Mac OS X/i.test(userAgent)) {

        os = "macOS";

    } else if (/Linux/i.test(userAgent)) {

        os = "Linux";
    }


    // BROWSER

    if (/OPR\//i.test(userAgent)) {

        browser = "Opera";

    } else if (/Edg\//i.test(userAgent)) {

        browser = "Microsoft Edge";

    } else if (/Chrome\//i.test(userAgent)) {

        browser = "Google Chrome";

    } else if (/Firefox\//i.test(userAgent)) {

        browser = "Mozilla Firefox";

    } else if (
        /Safari\//i.test(userAgent) &&
        !/Chrome/i.test(userAgent)
    ) {

        browser = "Safari";

    } else if (/MSIE|Trident/i.test(userAgent)) {

        browser = "Internet Explorer";
    }


    return {
        device,
        os,
        browser
    };
}


/*
============================================================
GET VISITOR IP
============================================================
*/

function getVisitorIP(req) {

    const forwardedFor =
        req.headers["x-forwarded-for"];

    const realIP =
        req.headers["x-real-ip"];

    const pinggyIP =
        req.headers["x-pinggy-client-ip"];

    const ip =
        forwardedFor ||
        realIP ||
        pinggyIP ||
        req.socket.remoteAddress ||
        "Unknown";

    /*
    x-forwarded-for can contain multiple IPs.

    Example:
    1.2.3.4, 5.6.7.8
    */

    if (typeof ip === "string") {

        return ip
            .split(",")[0]
            .trim();
    }

    return ip;
}


/*
============================================================
VISITOR KEY
============================================================
*/

function getVisitorKey(req, userId) {

    const ip =
        getVisitorIP(req);

    const userAgent =
        req.headers["user-agent"] ||
        "Unknown";

    /*
    If we know the Firebase user ID,
    use that as the primary identity.

    Otherwise fall back to IP + User-Agent.
    */

    if (userId) {

        return `USER:${userId}`;
    }

    return `IP:${ip}|UA:${userAgent}`;
}


/*
============================================================
CREATE / GET VISITOR
============================================================
*/

async function getVisitorInfo(req) {

    const userId =
        getUserId(req);

    const key =
        getVisitorKey(
            req,
            userId
        );


    if (!visitors.has(key)) {

        visitorNumber++;


        const userAgent =
            req.headers["user-agent"] ||
            "Unknown";


        const deviceInfo =
            getDeviceInfo(
                userAgent
            );


        const ip =
            getVisitorIP(req);


        /*
        Get Firebase user name
        */

        let firebaseUser = null;

        if (userId) {

            firebaseUser =
                await getFirebaseUser(
                    userId
                );
        }


        visitors.set(key, {

            number: visitorNumber,

            userId:
                userId || null,

            name:
                firebaseUser?.name ||
                "Unknown User",

            ip,

            device:
                deviceInfo.device,

            os:
                deviceInfo.os,

            browser:
                deviceInfo.browser,

            userAgent,

            host:
                req.headers.host ||
                "Unknown",

            referer:
                req.headers.referer ||
                "None",

            requests: [],

            firstRequest:
                Date.now(),

            lastRequest:
                Date.now(),

            timer: null,

            reported: false

        });

    }


    const visitor =
        visitors.get(key);


    visitor.lastRequest =
        Date.now();


    /*
    If the user name was not available
    when the visitor was created,
    try Firebase again.
    */

    if (
        visitor.name ===
            "Unknown User" &&
        userId
    ) {

        const firebaseUser =
            await getFirebaseUser(
                userId
            );

        if (firebaseUser) {

            visitor.name =
                firebaseUser.name;
        }
    }


    return visitor;
}


/*
============================================================
PRINT VISITOR
============================================================
*/

function printVisitor(visitor) {

    if (visitor.reported) {

        return;
    }


    visitor.reported = true;


    const totalTime =
        visitor.lastRequest -
        visitor.firstRequest;


    const successful =
        visitor.requests.filter(
            request =>
                request.status >= 200 &&
                request.status < 400
        );


    const failed =
        visitor.requests.filter(
            request =>
                request.status >= 400
        );


    const totalServerTime =
        visitor.requests.reduce(
            (sum, request) =>
                sum + request.time,
            0
        );


    console.log("");

    console.log("");

    console.log(
        "============================================================"
    );

    console.log(
        `VISITOR #${visitor.number}`
    );

    console.log(
        "============================================================"
    );


    console.log(
        "Name:             ",
        visitor.name
    );

    console.log(
        "User ID:          ",
        visitor.userId ||
        "Not provided"
    );

    console.log(
        "Time:             ",
        new Date(
            visitor.firstRequest
        ).toLocaleString()
    );

    console.log(
        "IP Address:       ",
        visitor.ip
    );

    console.log(
        "Device:           ",
        visitor.device
    );

    console.log(
        "Operating System: ",
        visitor.os
    );

    console.log(
        "Browser:          ",
        visitor.browser
    );

    console.log(
        "Host:             ",
        visitor.host
    );

    console.log(
        "Referer:          ",
        visitor.referer
    );


    console.log("");

    console.log(
        "REQUESTS"
    );

    console.log(
        "------------------------------------------------------------"
    );


    for (
        const request of
        visitor.requests
    ) {

        const statusText =
            request.status >= 200 &&
            request.status < 400
                ? "SUCCESS"
                : "FAILED";


        console.log(

            `${request.method.padEnd(6)} ` +

            `${request.url.padEnd(35)} ` +

            `${String(
                request.status
            ).padEnd(4)} ` +

            `${request.time
                .toFixed(2)
                .padStart(8)} ms  ` +

            `${statusText}`

        );
    }


    console.log(
        "------------------------------------------------------------"
    );


    console.log("");

    console.log(
        "SUMMARY"
    );

    console.log(
        "------------------------------------------------------------"
    );


    console.log(
        "Total Requests:   ",
        visitor.requests.length
    );

    console.log(
        "Successful:       ",
        successful.length
    );

    console.log(
        "Failed:           ",
        failed.length
    );

    console.log(
        "Total Server Time:",
        `${totalServerTime.toFixed(2)} ms`
    );

    console.log(
        "Visit Duration:   ",
        `${totalTime} ms`
    );


    console.log(
        "============================================================"
    );

    console.log("");
}


/*
============================================================
REQUEST LOGGING
============================================================
*/

app.use(async (req, res, next) => {

    const startTime =
        process.hrtime.bigint();


    let visitor;

    try {

        visitor =
            await getVisitorInfo(
                req
            );

    } catch (error) {

        console.error(
            "[VISITOR ERROR]",
            error
        );

        next();

        return;
    }


    /*
    When Express finishes responding,
    record the request.
    */

    res.on("finish", () => {

        const elapsed =
            Number(
                process.hrtime.bigint() -
                startTime
            ) / 1e6;


        visitor.requests.push({

            method:
                req.method,

            url:
                req.originalUrl,

            status:
                res.statusCode,

            time:
                elapsed

        });


        visitor.lastRequest =
            Date.now();


        /*
        Wait 1.5 seconds for other files
        such as CSS and JavaScript.
        */

        if (visitor.timer) {

            clearTimeout(
                visitor.timer
            );
        }


        visitor.timer =
            setTimeout(() => {

                printVisitor(
                    visitor
                );

            }, 1500);

    });


    next();

});


/*
============================================================
OPTIONAL ENDPOINT

This allows your frontend to tell the server
which Firebase user is currently visiting.

Example:

POST /visitor-info

Header:
X-User-ID: USER-123
*/

app.post(
    "/visitor-info",
    async (req, res) => {

        const userId =
            getUserId(req);


        if (!userId) {

            res.status(400)
                .json({
                    success: false,
                    error:
                        "No user ID provided"
                });

            return;
        }


        const user =
            await getFirebaseUser(
                userId
            );


        if (!user) {

            res.status(404)
                .json({
                    success: false,
                    error:
                        "User not found"
                });

            return;
        }


        res.json({

            success: true,

            userId:
                user.id,

            name:
                user.name

        });

    }
);


/*
============================================================
SERVE WEBSITE
============================================================
*/

app.use(
    express.static(
        __dirname,
        {
            cacheControl: false,

            setHeaders: (res) => {

                res.setHeader(
                    "Cache-Control",
                    "no-cache"
                );
            }
        }
    )
);


/*
============================================================
404
============================================================
*/

app.use(
    (req, res) => {

        res
            .status(404)
            .type(
                "text/plain; charset=utf-8"
            )
            .send(
                "File Not Found"
            );
    }
);


/*
============================================================
ERROR HANDLER
============================================================
*/

app.use(
    (err, req, res, next) => {

        console.error(
            "Server error:",
            err
        );


        if (!res.headersSent) {

            res
                .status(500)
                .type(
                    "text/plain; charset=utf-8"
                )
                .send(
                    "Internal Server Error"
                );
        }
    }
);


/*
============================================================
START SERVER
============================================================
*/

const server =
    app.listen(
        PORT,
        HOST,
        () => {

            console.log("");

            console.log(
                "============================================================"
            );

            console.log(
                "NODE SERVER ONLINE"
            );

            console.log(
                "============================================================"
            );

            console.log(
                `Listening on:      ${HOST}:${PORT}`
            );

            console.log(
                `Local URL:         http://localhost:${PORT}`
            );

            console.log(
                `Firebase Database: ${FIREBASE_DATABASE_URL}`
            );

            console.log(
                `Started:           ${new Date().toLocaleString()}`
            );

            console.log(
                "============================================================"
            );

            console.log("");
        }
    );


/*
============================================================
CLIENT ERRORS
============================================================
*/

server.on(
    "clientError",
    (err, socket) => {

        console.log("");

        console.log(
            "CLIENT ERROR"
        );

        console.log(
            "Error:",
            err.message
        );

        console.log("");

        socket.end(
            "HTTP/1.1 400 Bad Request\r\n\r\n"
        );
    }
);

