function seqAlign(seq1, seq2, match = 0, mismatch = 1, gap = 1) {
    const m = seq1.length;
    const n = seq2.length;
  
    // initialize dp and traceback array
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const traceback = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i * gap;
      traceback[i][0] = 1; // Up
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j * gap;
      traceback[0][j] = 2; // Left
    }
    traceback[0][0] = 0;
  
    // fill table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const score = (seq1[i - 1] === seq2[j - 1]) ? match : mismatch;
  
        const choices = [
          [dp[i - 1][j - 1] + score, 0], // Diagonal (match/mismatch)
          [dp[i - 1][j] + gap, 1],         // Up (deletion)
          [dp[i][j - 1] + gap, 2]          // Left (insertion)
        ];
  
        // Choose minimum score
        let minScore = choices[0][0];
        let direction = choices[0][1];
        for (let k = 1; k < choices.length; k++) {
          if (choices[k][0] < minScore) {
            minScore = choices[k][0];
            direction = choices[k][1];
          }
        }
        dp[i][j] = minScore;
        traceback[i][j] = direction;
      }
    }
  
    // backtrack to get the alignment
    let align1 = "";
    let align2 = "";
    let operations = "";
    let detailedOps = "";
    let matchesCount = 0;
    let totalOps = 0;
  
    let i = m;
    let j = n;
  
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && traceback[i][j] === 0) {
        // Diagonal move: match or substitution
        align1 = seq1[i - 1] + align1;
        align2 = seq2[j - 1] + align2;
        if (seq1[i - 1] === seq2[j - 1]) {
          operations = "M" + operations;
          detailedOps = "Match " + seq1[i - 1] + " " + detailedOps;
          matchesCount++;
        } else {
          operations = "S" + operations;
          detailedOps = "Substitute " + seq1[i - 1] + " -> " + seq2[j - 1] + " " + detailedOps;
        }
        i--;
        j--;
      } else if (i > 0 && traceback[i][j] === 1) {
        // Up move: deletion
        align1 = seq1[i - 1] + align1;
        align2 = "-" + align2;
        operations = "D" + operations;
        detailedOps = "Delete " + seq1[i - 1] + " " + detailedOps;
        i--;
      } else {
        // Left move: insertion
        align1 = "-" + align1;
        align2 = seq2[j - 1] + align2;
        operations = "I" + operations;
        detailedOps = "Insert " + seq2[j - 1] + " " + detailedOps;
        j--;
      }
      totalOps++;
    }
  
    const percentMatch = (totalOps > 0) ? (matchesCount / totalOps) * 100 : 100;
    return [dp[m][n], align1, align2, operations, detailedOps, percentMatch];
  }
  
  function bestMatch(query, database) {
    let bestScore = Infinity;
    let bestAlignment = null;
    let bestSeq = null;
    let bestOperations = null;
    let bestDetailedOps = null;
    let bestPercentMatch = 0;
  
    for (const seq of database) {
      const [score, align1, align2, operations, detailedOps, percentMatch] = seqAlign(query, seq);
      if (score < bestScore) {
        bestScore = score;
        bestAlignment = [align1, align2];
        bestSeq = seq;
        bestOperations = operations;
        bestDetailedOps = detailedOps;
        bestPercentMatch = percentMatch;
      }
    }
  
    return [bestSeq, bestScore, bestAlignment, bestOperations, bestDetailedOps, bestPercentMatch];
  }
  

  function exampleUsage()
  {
    const database = ["password123", "hahahaha", "lolXD", "123456"];
    const password = "password";

    const [bestSeq, bestScore, bestAlignment, bestOperations, bestDetailedOps, bestPercentMatch] = bestMatch(password, database);

    // Print results
    console.log(`Best match: ${bestSeq}`);
    console.log(`Score: ${bestScore}`);
    console.log(`Percent Match: ${bestPercentMatch.toFixed(2)}%`);
    console.log(`Alignment:\n${bestAlignment[0]}\n${bestAlignment[1]}`);
    console.log(`Operations: ${bestOperations}`);
    console.log(`Detailed Steps: ${bestDetailedOps}`);
  }

  
  function actualUsage(password, numPassInDatabase)
  {
    const fs = require('fs');

    // Read the file synchronously
    const data = fs.readFileSync('ncscCommonPasswords.txt', 'utf8');

    // Split the file into lines and take the first numPassInDatabase
    const database = data.split(/\r?\n/).filter(line => line.trim() !== '').slice(0, numPassInDatabase);

    const [bestSeq, bestScore, bestAlignment, bestOperations, bestDetailedOps, bestPercentMatch] = bestMatch(password, database);
    return (100-bestPercentMatch);
  }