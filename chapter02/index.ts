import * as aws from "@pulumi/aws";

new aws.s3.Bucket("chapter02", {
    bucket: "chapter02-bucket",
});
