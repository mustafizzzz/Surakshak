// import 'dart:async';

// import 'package:age_well/theme/fontStyles.dart';
// import 'package:chat_gpt_sdk/chat_gpt_sdk.dart';
// import 'package:flutter/material.dart';
// import 'package:get/get.dart';

// void main() {
//   runApp(const MyApp());
// }

// class MyApp extends StatelessWidget {
//   const MyApp({Key? key}) : super(key: key);

//   // This widget is the root of your application.
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Bot Gpt',
//       debugShowCheckedModeBanner: false,
//       theme: ThemeData(
//         primarySwatch: Colors.blue,
//       ),
//       home: const GPTPage(),
//     );
//   }
// }

// class GPTPage extends StatefulWidget {
//   const GPTPage({super.key});

//   @override
//   State<GPTPage> createState() => _GPTPageState();
// }

// class _GPTPageState extends State<GPTPage> {
//   RxBool isLoading = false.obs;

//   @override
//   void initState() {
//     super.initState();
//     openAI = OpenAI.instance.build(
//         token: "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",
//         baseOption: HttpSetup(receiveTimeout: 60 * 1000),
//         isLogger: true);
//   }

//   late OpenAI openAI;

//   ///t => translate
//   final tController = StreamController<CTResponse?>.broadcast();
//   final TextEditingController _prompt = TextEditingController();

//   void _chatGpt3ExampleStream() async {
//     isLoading(true);
//     final request = CompleteText(
//         prompt: _prompt.text, model: kTranslateModelV3, maxTokens: 200);

//     _prompt.text = "";

//     openAI.onCompleteStream(request: request).listen((it) {
//       _prompt.clear();
//       debugPrint(it.toString());
//       isLoading(false);
//       tController.sink.add(it);
//     }).onError((err) {
//       print(err.toString());
//     });
//   }

//   @override
//   void dispose() {
//     _prompt.dispose();
//     tController.close();
//     openAI.close();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return SafeArea(
//       child: Scaffold(
//         backgroundColor: Colors.grey.shade300,
//         body: Container(
//           margin: const EdgeInsets.all(20),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.stretch,
//             children: [
//               Expanded(
//                 child: StreamBuilder<CTResponse?>(
//                     stream: tController.stream,
//                     builder: (context, snapshot) {
//                       if (snapshot.hasData) {
//                         return SingleChildScrollView(
//                           child: Text(
//                             snapshot.data!.choices.last.text,
//                             style: poppins.copyWith(fontSize: 18),
//                           ),
//                         );
//                       } else if (snapshot.data == null) {
//                         return Text(
//                           "Ask me Anything you want",
//                           style: poppins.copyWith(fontSize: 18),
//                         );
//                       }

//                       return Text("loading");
//                     }),
//               ),
//               _inputCard(MediaQuery.of(context).size),
//             ],
//           ),
//         ),
//       ),
//     );
//   }

//   Widget _inputCard(Size size) {
//     return Container(
//       padding: const EdgeInsets.symmetric(horizontal: 16.0),
//       alignment: Alignment.bottomCenter,
//       decoration: BoxDecoration(
//         borderRadius: BorderRadius.circular(10),
//         border: Border.all(color: Colors.grey),
//         color: Colors.grey,
//       ),
//       child: Row(
//         mainAxisAlignment: MainAxisAlignment.spaceBetween,
//         children: [
//           Flexible(
//             flex: 5,
//             child: TextField(
//               decoration: const InputDecoration(
//                   border: InputBorder.none,
//                   focusedBorder: InputBorder.none,
//                   enabledBorder: InputBorder.none,
//                   disabledBorder: InputBorder.none,
//                   focusColor: Colors.white),
//               controller: _prompt,
//               maxLines: 6,
//               minLines: 1,
//               style: TextStyle(color: Colors.white),
//               cursorColor: Colors.white,
//               textInputAction: TextInputAction.newline,
//               keyboardType: TextInputType.multiline,
//             ),
//           ),
//           Flexible(
//             flex: 1,
//             child: IconButton(
//                 onPressed: () {
//                   _chatGpt3ExampleStream();
//                 },
//                 icon: Icon(
//                   Icons.send,
//                   color: Colors.white,
//                 )),
//           )
//         ],
//       ),
//     );
//   }
// }