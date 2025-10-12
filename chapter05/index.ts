import * as aws from "@pulumi/aws";

const chapter05 = new aws.iam.Role("chapter05", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(aws.iam.Principals.LambdaPrincipal),
});

new aws.lambda.CallbackFunction("chapter05", {
    name: "chapter05-function",
    runtime: aws.lambda.Runtime.NodeJS22dX,
    role: chapter05.arn,
    callback: async (_event) => {
        console.log('aws-pulumi-workshop-using-localstack');
        return;
    }
});
