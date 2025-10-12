import * as aws from "@pulumi/aws";

new aws.s3.Bucket("chapter09", {
    bucket: "chapter09-bucket",
});

new aws.cloudwatch.LogGroup("chapter09", {
    name: "chapter09-logs",
    retentionInDays: 7,
});
