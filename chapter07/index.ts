import * as aws from "@pulumi/aws";

const chapter07 = new aws.iam.Role("chapter07", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(aws.iam.Principals.LambdaPrincipal),
});

new aws.lambda.CallbackFunction("chapter07", {
    name: "chapter07-function",
    runtime: aws.lambda.Runtime.NodeJS22dX,
    role: chapter07.arn,
    callback: async (_event) => {
        console.log('aws-pulumi-workshop-using-localstack');
        return;
    }
});
