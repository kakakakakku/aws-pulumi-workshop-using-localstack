import * as aws from "@pulumi/aws";

new aws.s3.Bucket("chapter03", {
    bucket: "chapter03-bucket",
});
