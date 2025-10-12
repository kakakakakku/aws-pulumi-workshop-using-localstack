import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("chapter06", {
    bucket: "chapter06-bucket",
});

const chapter06 = new aws.iam.Role("chapter06", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(aws.iam.Principals.LambdaPrincipal),
});

const lambda = new aws.lambda.CallbackFunction("chapter06", {
    name: "chapter06-function",
    runtime: aws.lambda.Runtime.NodeJS22dX,
    role: chapter06.arn,
    callback: async (event: aws.s3.BucketEvent) => {
        console.log(`bucket = ${event.Records[0].s3.bucket.name}`);
        console.log(`key = ${event.Records[0].s3.object.key}`);
        return;
    }
});

new aws.s3.BucketNotification("chapter06", {
    bucket: bucket.id,
    lambdaFunctions: [{
        lambdaFunctionArn: lambda.arn,
        events: ["s3:ObjectCreated:*"],
    }],
});

new aws.lambda.Permission("chapter06", {
    action: "lambda:InvokeFunction",
    function: lambda.name,
    principal: "s3.amazonaws.com",
    sourceArn: bucket.arn,
});
